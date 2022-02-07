import { nodefs,writeChanged } from "pitaka/cli";
import {spacify,autoBreak,paragraphSimilarity,diffBreak,breakSentence} from "pitaka/utils";
import {openBasket} from "pitaka/basket";
await nodefs;

const cs=await openBasket('cs');
const sc=await openBasket('sc-pli');
const sclocators=sc.enumLocators("an");
//test mn1.5 for autobreak and mn1.272 for diffbreak
const start=0;//271; //mn1.5 autobreak mn1.10 diffbreak
const max=sclocators.length;
const problematic=[]; 
const out=[];
// const ll=await cs.readLoc('a3.1'); //an2.191-200
// console.log(ll)
const removeHeader=str=>{
    return str.replace(/^(.+)(\^n[\-\d]+)/,(m,rm,n)=>" ".repeat(rm.length)+n)
        .replace(/(\([^\)]+\))/g,(m,m1)=>" ".repeat(m1.length))
}
const removeVariantBold=str=>{
    return str.replace(/(\^[vb][^\]]+\])/g,(m,m1)=>" ".repeat(m1.length))
}
const dumpProblematic=(p1,p2)=>{
    const out=[]
    const max=Math.max(p1.length,p2.length);
    for (let i=0;i<max;i++) {
        out.push((p1[i]||'')+'\t'+p2[i]||'');
    }
    return out;
}
let ok=0;
for (let i=start;i<max;i++) {
    let pass=false, breakpos;
    let sclines_o = await sc.readLoc(sclocators[i]);
    let cslines_o = await cs.readLoc(sclocators[i]);

    // console.log(sclines_o)
    // console.log(cslines_o)
    process.stdout.write(`\r${sclocators[i]} ${i}/${max}      `);
    if (!cslines_o.length) {
        console.log('empty cs id',sclocators[i])
        continue;
    }
    const res=autoBreak(cslines_o);
    const sclines=sclines_o.map(removeHeader);
    const cslines=cslines_o.map(removeHeader).map(removeVariantBold);
    if (sclines.length===res.sentences.length) {
        const sim=paragraphSimilarity(sclines.map(spacify), res.sentences.map(spacify) );
        if (sim<0.03) {
            pass=true;
            breakpos=res.breakpos;
            ok++;
        }
    } 
    if (!pass && sclines.length && cslines.length){
        const diffbreakpos=diffBreak(cslines.map(spacify), sclines.map(spacify));
        const sents=breakSentence(cslines_o,diffbreakpos);

        const sim=paragraphSimilarity(sclines.map(spacify), sents.map(removeVariantBold).map(removeHeader).map(spacify) );
        if (sim<0.1) {
            breakpos=diffbreakpos;
            ok++;
        } else {
            // console.log(sim,diffbreakpos);
            // console.log(sclines.map(spacify));

            // console.log(sclines)
            // console.log(sents)
            // process.stdout.write(`\rproblematic ${sclocators[i]} ${i}/${max}      `);
            problematic.push(`${i} ${sclocators[i]}\t${sim}`);
            problematic.push( ...dumpProblematic(sclines,sents));
        }    

    }

    // console.log(cslines)
    
    if (breakpos) out.push( breakpos.map( (it,idx)=>'['+it.join(',') +'],'+ (!idx?'//'+sclocators[i]:"") ).join('\n') );

}

if (writeChanged('breakpos.txt',out.join('\n'))) console.log('written breakpos.txt',out.length);
if (writeChanged('problematic.txt',problematic.join('\n'))) console.log('written problematic.txt',problematic.length);
console.log('ok',ok,'all',sclocators.length,'success rate', (ok/max).toFixed(3)*100+'%')
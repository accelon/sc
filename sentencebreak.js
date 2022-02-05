import { nodefs } from "pitaka/cli";
import {spacify,autoBreak,paragraphSimilarity,diffBreak,breakSentence} from "pitaka/utils";
import {openBasket} from "pitaka/basket";
await nodefs;

const cs=await openBasket('cs');
const sc=await openBasket('sc-pli');
const sclocators=sc.enumLocators();
const start=132;
const max=sclocators.length;

const removeHeader=str=>{
    return str.replace(/^(.+)(\^n[\-\d]+)/,(m,rm,n)=>" ".repeat(rm.length)+n)
        .replace(/(\([^\)]+\))/g,(m,m1)=>" ".repeat(m1.length))
}
const removeVariantBold=str=>{
    return str.replace(/(\^[vb][^\]]+)/g,(m,m1)=>" ".repeat(m1.length))
}

let ok=0;
for (let i=start;i<max;i++) {
    let pass=false;
    let sclines_o = (await sc.readLoc(sclocators[i]));
    let cslines_o = (await cs.readLoc(sclocators[i]));

    const cslines2=autoBreak(cslines_o);
    const sclines=sclines_o.map(removeHeader);
    const cslines=cslines_o.map(removeHeader).map(removeVariantBold);
    if (sclines.length===cslines2.length) {
        const sim=paragraphSimilarity(sclines.map(spacify), cslines2.map(spacify) );
        if (sim<0.03) {
            pass=true;
            ok++;
        }
    } 

    if (!pass){
        const breakpos=diffBreak(cslines.map(spacify), sclines.map(spacify));
        const sents=breakSentence(cslines_o.join(' '),breakpos);
        
        const sim=paragraphSimilarity(sclines.map(spacify), sents.map(removeVariantBold).map(removeHeader).map(spacify) );
        if (sim<0.1) {
            ok++;
        } else {
            console.log(sim,i,sclocators[i],breakpos);
            console.log(sclines);
            console.log(cslines);
            // console.log(sents);
        }
    }
    console.log('\r'+`${i} ${sclocators[i]} ${sclines.length} ${cslines.length}`); 
    // sclines=sclines.map(removeHeader).map(spacify);
    // cslines=cslines.map(removeHeader).map(spacify).map(removeVariant);
    // console.log('sc',sclines)
    // console.log('cs',cslines)

}
// console.log('maxwidth',maxwidth,line)
console.log('ok',ok,'all',sclocators.length)
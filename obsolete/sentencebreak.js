import { nodefs,writeChanged,openBasket,LOCATORSEP } from "pitaka/cli";
import { guidedBreak } from "./guidedbreak";
await nodefs;

const cs=await openBasket('cs');
const sc=await openBasket('sc-pli');
const sclocators=sc.enumLocators("");
//test mn1.5 for autobreak and mn1.272 for diffbreak
// const start=0;//7;//271; //mn1.5 autobreak mn1.10 diffbreak
// const max=sclocators.length;
const problematic=[]; 
const out=[];
// const ll=await cs.readLoc('a3.1'); //an2.191-200
// console.log(ll)

const bookbreakpos={};
let ok=0;
let bookstarty=0, prevbook='';
for (let i=start;i<max;i++) {
    const loc=sclocators[i]
    let sclines_o = await sc.readLoc(loc);
    let cslines_o = await cs.readLoc(loc);
    process.stdout.write(`\r${loc} ${i}/${max}      `);
    const breakpos=guidedBreak(loc,sclines_o,cslines_o,problematic);
    if (breakpos) ok++;

    //addressed by book:dy ( y from begining of book)
    const [book]=loc.split(LOCATORSEP);
    if (book!==prevbook) {
        bookstarty=cs.getPageRange(book)[0];
        prevbook=book;
        bookbreakpos[book]=[];
    }
    if (!breakpos) breakpos=[];
    const [y]=cs.getPageRange(loc);
    for (let j=0;j<breakpos.length;j++){
        const dy=y-bookstarty+j;
        bookbreakpos[book][dy]=breakpos[j];
    }
    //breakpos with pn for checking
    out.push( breakpos.map( (it,idx)=>'['+it.join(',') +'],'+ (!idx?'//'+loc:"") ).join('\n') );
}

if (writeChanged('breakpos.txt',out.join('\n'))) console.log('written breakpos.txt',out.length);
if (writeChanged('breakpos.json',JSON.stringify(bookbreakpos,'','').replace(/\],/g,'],\n') )) console.log('written bookbreakpos.json');
if (writeChanged('problematic.txt',problematic.join('\n'))) console.log('written problematic.txt',problematic.length);
console.log('ok',ok,'all',sclocators.length,'success rate', (ok/max).toFixed(3)*100+'%')
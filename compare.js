import {nodefs,glob, writeChanged} from 'pitaka/cli'; 
import {compareText} from 'pitaka/utils'; 
await nodefs; //export fs to global


import { toIAST } from 'provident-pali';
const csfolder='../cs/break-by-sc/';
const scfolder='./pli/'

const dofile=fn=>{
    const f1=csfolder+fn;
    const f2=scfolder+fn;
    const sims=compareText(f1,f2,0.95);
    sims.forEach(([i,sim,l1,l2])=>{
        if (sim<0.95) {
            console.log(i+1,sim);
            console.log('cs',l1);
            console.log('sc',l2);
        }
    })
}
let pat=process.argv[2]||'dn1.off';

const filelist= glob(scfolder,pat);
filelist.forEach(dofile);

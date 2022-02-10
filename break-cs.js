import {nodefs,glob, writeChanged,readTextLines} from 'pitaka/cli';
import {breakSentence,autoBreak,ensureArrayLength,toParagraphs} from "pitaka/utils";
await nodefs; //export fs to global
import { guidedBreak } from './guidedbreak.js';

const desfolder='../cs/break-by-sc/'; //copy to cs/breakpos
const srcfolder='./pli/'
const csfolder='../cs/off/';     //
const testfn='dn1.off';

let pat=process.argv[2]||testfn;
const checkleadblank=(fn,lines)=>{
    for (let i=0;i<lines.length;i++) {
        if (lines[i][0]==' ') throw `${fn} line ${(i+1)} has leading blank`;
    }
}

const fixPunc=str=>{
    //.replace(/…\n pE…/g,'\n …pE…')
    return str.replace(/\n।/g,'।\n')
    .replace(/\^\n(v\[[^\]]+\])/g,'^$1\n')
    .replace(/ \n/g,'\n ').replace(/( ?‘)\n/g,'\n$1')
    .replace(/\n( ?–)/g,'$1\n');
}
const failmarker='※';
const dofile=fn=>{
    const SC=readTextLines(srcfolder+fn);
    const CS=readTextLines(csfolder+fn);
    // checkleadblank(srcfolder+fn,sclines);
    // checkleadblank(csfolder+fn,cslines);
    const fnpf=fn.replace(/\..+$/,'');

    const sc=toParagraphs(SC,fnpf);
    const cs=toParagraphs(CS,fnpf);
    if (sc.length!==cs.length) {
        throw "max paragraph number unmatch cs "+cs.length+ ",sc "+sc.length
    }
    const out=[];
    for (let i=0;i<sc.length;i++) {
        const [id,sclines]=sc[i];
        const [id2,cslines]=cs[i];
        const problematic=[];
        if (id!==id2) throw "id unmatch "+id+ " "+id2;
        const breakpos=guidedBreak(id,sclines,cslines,problematic);
        let sents;

        if (!breakpos) {
            sents=autoBreak(cslines).sentences;
            sents[0]=failmarker+sents[0];
            // console.log('no breakpos')
        } else {
            sents=breakSentence(cslines,breakpos);
        }
        ensureArrayLength(sents,sclines.length,failmarker)
        // sents=sents.map(it=>it.trim());
        out.push(...sents  ) ;
    }
    const outstr=fixPunc(out.join('\n'));
    if (writeChanged(desfolder+fn+'.ori',outstr)) console.log('written',desfolder+fn+'.ori');
}
const filelist= glob(srcfolder,pat);
filelist.forEach(dofile);
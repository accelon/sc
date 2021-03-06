import { readTextContent } from "pitaka/cli";
const ptsparfolder='../sc/pts-par/';
const PTSID={}; //generated by pts-par.js
//assuming fs is available
const loadParaLine=bkpf=>{
    const fn=bkpf[0]+'n.json';
    const json= JSON.parse(readTextContent(ptsparfolder+fn));
    for (let key in json) {
        PTSID[key]=json[key];
    }
}
export const PTSParaLineCount=suttaId=>{
    const bkpf=suttaId.replace(/\d+$/,'');
    if (!PTSID[suttaId]) loadParaLine(bkpf);
    if (!PTSID[suttaId]) throw "cannot load paralinecount for sutta "+suttaId;
    return PTSID[suttaId];
}
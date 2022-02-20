/* 產生offtag加sc-id模版，的 create template for offtext generation */
import { writeChanged,nodefs, kluer, readTextLines} from 'pitaka/cli'
import { sc,cs} from 'pitaka/meta'
import { combineJSON, filesOfBook } from './src/bilara-folder.js';
import {Breakseg} from './src/breakseg.js'; //see if a sc segment is break
import Errata from './src/msdiv-errata.js'; //higher precedence
import { packAttrs } from 'pitaka/offtext';
import Inserts from './src/inserts.js'
import { toParagraphs } from 'pitaka/utils';
await nodefs
const {yellow} =kluer;
const bilara_folder='../../github/bilara-data/';
const desfolder='template/';
const pat=process.argv[2]||"dn1";
const nosub=process.argv[3]=='nosub';
const pitaka=sc.pitakaOf(pat);
const datafolder=bilara_folder+'root/pli/ms/'+pitaka+'/';   
const reffolder=bilara_folder+'reference/pli/ms/'+pitaka+'/';
const csfolder='../cs/off/';
const books=sc.booksOf(pat);
console.log(yellow('syntax'),'node template [bkid/bkpf] [nosub]');
const extractRefKey=(book,refjson,entry)=>{
    const out={};
    for (let newkey in Errata[book]) refjson[newkey]=Errata[book][newkey];
    for (let key in refjson) {
        const v=refjson[key];
        const at=v.indexOf(entry);
        if (at==-1) continue;
        const comma=v.indexOf(',',at);
        //text after msdiv and before , are included , thus might use to inject text , \n 
        //for example sn53.45:54:1.1 ^n935-966 and ^n967-967
        out[key]=v.substring(entry.length+at, comma>-1?comma: v.length);
    }
    return out;
}
const makeIDTag=(id,addition='',breakseg=null)=>{
    if (!breakseg) return addition+'<'+id+'>';
    const endat=packAttrs(breakseg,{pn:true});
    const startat=packAttrs(breakseg,{pn:true});
    if (breakseg.pn) { //下一行才輸出段號
        return '<'+id+' '+endat+'>\n'+addition+'<'+id+' '+startat+' copy="from">';
    } else {
        return addition+'<'+id+' '+endat+'>\n<'+id+' '+startat+' copy="from">';
    }
}
const referenceName=fn=>fn.replace(/_([^\.]+)/,'_reference');
const getSubPara=bkid=>{
    const out={}// pn: [line_with_^n]
    const csbook=csfolder+bkid+'.off';
    if (!fs.existsSync(csbook)) return {};
    const csparas = toParagraphs(readTextLines(csbook));
    csparas.forEach(cspara=>{
        const [pn,paralines]=cspara;
        out[pn]=paralines.map( (t,i)=> t.substr(0,3)=='^n '?i:-1).filter(i=>i!==-1);
    });
    return out;
}
books.forEach(bkid=>{
    let files=filesOfBook(bkid,datafolder);
    console.log(files.slice(0,5),'total files',files.length);
    let bookjson=combineJSON(files.map(fn=>datafolder+fn));
    const refjson=combineJSON(files.map(fn=>reffolder+referenceName(fn)));
    const msdivs=extractRefKey(bkid,refjson,'msdiv');
    let cspara=!nosub&&getSubPara(bkid); //取 cs 的無號段，純<p rend="body">，非必要

    const out=[];
    let combined='', plcount=0, subpara=[];
    Object.keys(bookjson).forEach(id=>{
        const msdiv=msdivs[id]||'';
        let insert=Inserts[id]||'';
        plcount++;
        if (msdiv) {
            let chunk=cs.bookParanumToChunk(bkid, msdiv)||'';
            if (chunk) {
                let vagga='';
                const sep=(isNaN(parseInt(chunk))?'#':'');
                if (chunk.match(/\da$/)) {//first vagga
                    vagga='^ck'+sep+chunk.substr(0,chunk.length-1);
                }
                chunk= vagga+'^ck'+sep+chunk;
            }
            insert+=chunk;
            plcount=0; //start a new para with number
            subpara=cspara[msdiv]||[];
        }
        let addition='';
        //如果cs 版有無段號，輸出^n在行首，參考用
        const hassubpara=(!combined&&subpara.indexOf(plcount)>-1)?'^n ':'';
        if (insert.indexOf('\n')>-1) { //有新行
            addition+=insert+hassubpara; //先輸出新行，再輸出可能的^n
        } else {
            addition+=hassubpara+insert; //^n 必在開頭
        }
        addition += (msdiv? ((parseInt(msdiv)?'^n':'')+msdiv+' '):'');

        if (!combined&&id.endsWith(":0.1")) { //skip sutta number
            return; //for shorter headings
        }
        if ( id.match(/[\.:]0\./)|| (id.match(/[\.:]0$/) && 
        (parseInt(bookjson[id])|| !bookjson[id].includes("ddāna")) )) {  //
            //line with leading number and not Uddana has own line, 
            //is a header
            combined+=makeIDTag(id,addition); //one more space for combined section
        } else {
            const breaking=Breakseg[id]; //header cannot be break
            out.push(combined+makeIDTag(id,addition,breaking));
            combined='';
        }
    });
    if (combined) out.push(combined);
    const desfn=desfolder+bkid+'.off';
    if (writeChanged(desfn,out.join("\n"))) {
        console.log('written',desfn,out.length,'id')
    }
})
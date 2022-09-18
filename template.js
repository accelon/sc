/* 產生offtag加sc-id模版，的 create template for offtext generation */
import { writeChanged,nodefs, packOfftagAttrs, sc,cs} from 'ptk/nodebundle.cjs'
import {yellow} from 'ptk/cli/colors.cjs'
import { combineJSON, filesOf } from './src/bilara-folder.js';
import {Breakseg} from './src/breakseg.js'; //see if a sc segment is break
import Errata from './src/msdiv-errata.js'; //higher precedence
import Inserts from './src/inserts.js'
await nodefs

const bilara_folder='./bilara-data/';
const desfolder='template/';
const pat=process.argv[2]||"dn1";
const pitaka=sc.pitakaOf(pat);
const datafolder=bilara_folder+'root/pli/ms/'+pitaka+'/';   
const reffolder=bilara_folder+'reference/pli/ms/'+pitaka+'/';

const books=sc.booksOf(pat);
console.log(yellow('syntax'),'node template [bkid]');
const extractRefKey=(book,refjson,entry)=>{
    const out={};
    for (let newkey in Errata[book]) refjson[newkey]=Errata[book][newkey];
    for (let key in refjson) {
        const v=refjson[key];
        if (!v) console.log('ref key not found',key)
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
    const endat=packOfftagAttrs(breakseg,{pn:true});
    const startat=packOfftagAttrs(breakseg,{pn:true});
    if (breakseg.pn) { //下一行才輸出段號
        return '<'+id+' '+endat+'>\n'+addition+'<'+id+' '+startat+' copy="from">';
    } else {
        return addition+'<'+id+' '+endat+'>\n<'+id+' '+startat+' copy="from">';
    }
}
const referenceName=fn=>fn.replace(/_([^\.]+)/,'_reference');
books.forEach(bkid=>{
    let files=filesOf(bkid,datafolder);
    console.log('first 3 files',files.slice(0,3),'\nlast file',files.slice(files.length-1))
    console.log('total files',files.length);
    let bookjson=combineJSON(files.map(fn=>datafolder+fn));
    const refjson=combineJSON(files.map(fn=>reffolder+referenceName(fn)));
    const msdivs=extractRefKey(bkid,refjson,'msdiv');

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
        }
        let addition=insert;

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
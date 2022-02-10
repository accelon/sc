/* generate id sequence of output offtext per book*/
import {kluer, writeChanged,nodefs, readTextContent} from 'pitaka/cli'
import { combineJSON, filesOfBook,pitakaOf,booksOf,addMissingSectionMN10 } from './bilara-folder.js';
await nodefs
const bilara_folder='../../github/bilara-data/';
const desfolder='idseq/';
const pat=process.argv[2]||"mn";

const pitaka=pitakaOf(pat);
const datafolder=bilara_folder+'root/pli/ms/'+pitaka+'/';   
const books=booksOf(pat);
books.forEach(book=>{
    let files=filesOfBook(book,datafolder);

    console.log(files.slice(0,5),'total files',files.length);
    let bookjson=combineJSON(files.map(fn=>datafolder+fn));
    
    if (book==='mn1') {
        const dn2files=filesOfBook('dn2',datafolder).filter(it=>it.indexOf("dn22")>-1);
        bookjson=addMissingSectionMN10(bookjson, JSON.parse(readTextContent(datafolder+dn2files[0])));
    }
    const out=[];
    let combined='';
    Object.keys(bookjson).forEach(id=>{
        if ( id.match(/[\.:]0\./)|| (id.match(/[\.:]0$/) && parseInt(bookjson[id]) )) {
            //is a header
            combined+=id+'\t';
        } else {
            out.push(combined+id);
            combined='';
        }
    });
    if (combined) out.push(combined);
    const desfn=desfolder+book+'.txt';
    if (writeChanged(desfn,out.join("\n"))) {
        console.log('written',desfn,out.length,'id')
    }
})

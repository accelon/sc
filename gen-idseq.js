/* generate id sequence of output offtext per book*/
import {kluer, writeChanged,nodefs} from 'pitaka/cli'
import { combineJSON, filesOfBook,pitakaOf,booksOf } from './bilara-folder.js';
await nodefs
const bilara_folder='../../github/bilara-data/';
const desfolder='idseq/';
const pat=process.argv[2]||"dn1";

const pitaka=pitakaOf(pat);
const datafolder=bilara_folder+'root/pli/ms/'+pitaka+'/';   
const books=booksOf(pat);
books.forEach(book=>{
    const files=filesOfBook(book,datafolder);
    console.log(files.slice(0,5),'total files',files.length);
    const bookjson=combineJSON(files.map(fn=>datafolder+fn));
    const out=[];
    let combined='';
    Object.keys(bookjson).forEach(id=>{
        if ( id.match(/[\.:]0\./)|| id.match(/[\.:]0$/)) {
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

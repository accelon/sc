/* generate sc_json_id: "insert command" per*/
/* */
import {kluer, writeChanged,nodefs} from 'pitaka/cli'
import { combineJSON, filesOfBook,pitakaOf,booksOf } from './bilara-folder.js';
import fixmsdiv from './msdiv.js'; //msdiv has higher precedence

const {yellow} =kluer;
await nodefs
const bilara_folder='../../github/bilara-data/';

console.log(yellow('syntax'),'node gen-msdiv [bkid/bkpf]');
const pat=process.argv[2]||'mn'
const pitaka=pitakaOf(pat);

const reffolder=bilara_folder+'reference/pli/ms/'+pitaka+'/';
console.log(reffolder,'pat',pat,yellow('ref folder'));
const books=booksOf(pat);

const extractRefKey=(book,refjson,entry)=>{
    const out={};
    for (let newkey in fixmsdiv[book]) refjson[newkey]=fixmsdiv[book][newkey];
    for (let key in refjson) {
        const v=refjson[key];
        const at=v.indexOf(entry);
        if (at==-1) continue;
        const comma=v.indexOf(',',at);

        out[key]=v.substring(entry.length+at, comma>-1?comma: v.length);
    }
    return out;
}
books.forEach(book=>{
    const files=filesOfBook(book,reffolder);
    console.log(files.slice(0,5),'total files',files.length);
    const refjson=combineJSON(files.map(fn=>reffolder+fn));
    const msdivs=extractRefKey(book,refjson,'msdiv');
    if (writeChanged('msdiv/'+book+'.json',JSON.stringify(msdivs,'', ' '))) {
        console.log('written',book,Object.keys(msdivs).length,'items')
    }
})

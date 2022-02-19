/* generate sc_json_id: "insert command" per*/
/* */
import {kluer, writeChanged,nodefs} from 'pitaka/cli';
import { combineJSON, filesOfBook} from './src/bilara-folder.js';
import {sc} from 'pitaka/meta';
import Errata from './src/msdiv-errata.js'; //higher precedence

const {yellow} =kluer;
await nodefs
const bilara_folder='../../github/bilara-data/';

console.log(yellow('syntax'),'node gen-msdiv [bkid/bkpf]');
const pat=process.argv[2]||'mn'
const pitaka=sc.pitakaOf(pat);

const reffolder=bilara_folder+'reference/pli/ms/'+pitaka+'/';
console.log(reffolder,'pat',pat,yellow('ref folder'));
const books=sc.booksOf(pat);

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
books.forEach(book=>{
    const files=filesOfBook(book,reffolder);
    console.log(files.slice(0,5),'total files',files.length);
    const refjson=combineJSON(files.map(fn=>reffolder+fn));
    const msdivs=extractRefKey(book,refjson,'msdiv');
    if (writeChanged('msdiv/'+book+'.json',JSON.stringify(msdivs,'', ' '))) {
        console.log('written',book,Object.keys(msdivs).length,'items')
    }
})

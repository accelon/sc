/* */
import {kluer, writeChanged,nodefs, readTextLines, readTextContent} from 'pitaka/cli'
import { combineJSON, filesOfBook,pitakaOf,booksOf } from './bilara-folder.js';
import {bilara2offtext} from './bilara-offtext.js'
import inserts from './inserts.js'
const {yellow} =kluer;
await nodefs
const bilara_folder='../../github/bilara-data/';

console.log(yellow('syntax'),'node gen-[lang] [bkid/bkpf]');
export const gen=(pat,lang)=>{
	const pitaka=pitakaOf(pat);
	const datafolder=bilara_folder+ {pli:'root/pli/ms/'+pitaka+'/', 
	en:'translation/en/sujato/'+pitaka+'/',my:'translation/my/my-team/'+pitaka+'/'}[lang];
    
	console.log(datafolder,'pat',pat,yellow('data folder'),datafolder);
    const books=booksOf(pat);

    books.forEach(book=>{
        const files=filesOfBook(book,datafolder);
        if (book==='mn1') {
            files.push('dn/dn22_root-pli-ms.json');
        }
        console.log(files.slice(0,5),'total files',files.length);

        //emit text according to id
        const idseq=readTextLines('idseq/'+book+'.txt');
        //insert extra text
        const msdiv=JSON.parse(readTextContent('msdiv/'+book+'.json'));
    
        const bookjson=combineJSON(files.map(fn=>datafolder+fn));
        const offtext=bilara2offtext(lang,idseq,bookjson,msdiv,inserts);
        if (writeChanged(lang+'/'+book+'.off',offtext)) {
            console.log('written',book,offtext.length)
        }
    })

}

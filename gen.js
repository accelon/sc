/* */
import {kluer, writeChanged,nodefs} from 'pitaka/cli'
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
        console.log(files.slice(0,5),'total files',files.length);

        //emit text according to id
        const idseq=fs.readFileSync('idseq/'+book+'.txt','utf8').split(/\r?\n/);
        //insert extra text
        const msdiv=JSON.parse(fs.readFileSync('msdiv/'+book+'.json','utf8'));
    
        const bookjson=combineJSON(files.map(fn=>datafolder+fn));
        const offtext=bilara2offtext(lang,idseq,bookjson,msdiv,inserts);
        if (writeChanged(lang+'/'+book+'.off',offtext)) {
            console.log('written',book,offtext.length)
        }
    })

}

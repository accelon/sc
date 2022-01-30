/* */
import {kluer, writeChanged,nodefs} from 'pitaka/cli'
import { combineJSON, filesOfBook,pitakaOf,booksOf } from './bilara-folder.js';
import {bilara2offtext} from './bilara-offtext.js'
const {yellow} =kluer;
await nodefs
const bilara_folder='../../github/bilara-data/';
const reffolder=bilara_folder+'reference/pli/ms/sutta/';

console.log(yellow('syntax'),'node gen-[lang] [bkid/bkpf]');
export const gen=(pat,lang)=>{
	const pitaka=pitakaOf(pat);
	const datafolder=bilara_folder+ {pli:'root/pli/ms/'+pitaka+'/', 
	en:'translation/en/sujato/'+pitaka+'/',my:'translation/my/my-team/'+pitaka+'/'}[lang];
    
	console.log(datafolder,'pat',pat,yellow('data folder'));
    const books=booksOf(pat);
    books.forEach(book=>{
        const files=filesOfBook(book,datafolder);
        console.log(files.slice(0,5),'total files',files.length);
        const bookjson=combineJSON(files.map(fn=>datafolder+fn));
        const {offtext,idarr}=bilara2offtext(bookjson);
        if (writeChanged(lang+'/'+book+'.off',offtext)) {
            console.log('written',book,offtext.length)
        }
    })

}

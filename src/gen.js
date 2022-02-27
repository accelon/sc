/* 依模版(template)產生符合 cs 格式的 offtext 檔 */
import {kluer, writeChanged,nodefs, readTextLines, readTextContent} from 'pitaka/cli'
import { sc } from 'pitaka/meta';
import { combineJSON, filesOfBook } from './bilara-folder.js';
import {fillTemplate} from './filltemplate.js'
const {yellow} =kluer;
await nodefs
const bilara_folder='./bilara-data/';
const template_folder='template/';
console.log(yellow('syntax'),'node gen-[lang] [bkid/bkpf]');
export const gen=(pat,lang)=>{
	const pitaka=sc.pitakaOf(pat);
	const datafolder=bilara_folder+ {pli:'root/pli/ms/'+pitaka+'/', 
	en:'translation/en/sujato/'+pitaka+'/',my:'translation/my/my-team/'+pitaka+'/'}[lang];
    
	console.log(datafolder,'pat',pat,yellow('data folder'),datafolder);
    const books=sc.booksOf(pat);

    books.forEach(book=>{
        const namespace=lang==='pli'?'.ms':'.sc';
        const files=filesOfBook(book,datafolder);
        console.log('total files',files.length);
        const template=readTextContent(template_folder+book+'.off');
        const bookjson=combineJSON(files.map(fn=>datafolder+fn));        
        // const offtext=bilara2offtext(lang,idseq,bookjson,msdiv,inserts,book);
        const offtext=fillTemplate(template,bookjson,lang);
        if (writeChanged(lang+'/'+book+namespace+'.off',offtext)) {
            console.log('written',book,offtext.length)
        }
    })
}
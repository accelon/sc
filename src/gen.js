/* 依模版(template)產生符合 cs 格式的 offtext 檔 */
import {kluer, writeChanged,nodefs, readTextLines, readTextContent} from 'pitaka/cli'
import { sc } from 'pitaka/meta';
import { combineJSON, filesOf } from './bilara-folder.js';
import { SEGID_ERRATA } from './segid-errata.js';
import {fillTemplate} from './filltemplate.js'
import {pinNotes} from "pitaka/align";
const {yellow,red} =kluer;
await nodefs
const bilara_folder='./bilara-data/';
const template_folder='template/';
console.log(yellow('syntax'),'node gen-[lang] [bkid/bkpf]');
const genNotes=(lines,comments)=>{ //note marker in lines will be removed;
    const Comments=[];
    for (let id in comments) {
        Comments.push({ id, y:0, pin:'', val:comments[id]} );
    }
    const notes=pinNotes(lines,Comments, 
        {removeId:true, // set to false to keep the sc id
        pat:/ ?⚓([a-z\.\:\d\-]+) ?/g}); 
    return notes;
}
export const gen=(pat,lang)=>{
	const pitaka=sc.pitakaOf(pat);
    const translator= (pitaka=='vinaya')?'brahmali':'sujato';
	const datafolder=bilara_folder+ {pli:'root/pli/ms/'+pitaka+'/', 
	en:'translation/en/'+translator+'/'+pitaka+'/',my:'translation/my/my-team/'+pitaka+'/'}[lang];

    const comfolder=bilara_folder+ {en:'comment/en/'+translator+'/'+pitaka+'/'}[lang];

	console.log(datafolder,'pat',pat,yellow('data folder'),datafolder);
    const books=sc.booksOf(pat);

    books.forEach(book=>{
        const namespace=lang==='pli'?'.ms':'.sc';
        const files=filesOf(book,datafolder);
        const template=readTextContent(template_folder+book+'.off');
        const bookjson=combineJSON(files.map(fn=>datafolder+fn),SEGID_ERRATA);
        const comfiles=comfolder?filesOf(book,comfolder):[];
        const comments=comfolder?combineJSON(comfiles.map(fn=>comfolder+fn),SEGID_ERRATA):{};

        // const offtext=bilara2offtext(lang,idseq,bookjson,msdiv,inserts,book);
        let offtext=fillTemplate(template,bookjson,lang,{comments});
        const lines=offtext.split('\n');
        if (comfolder) {
            const notes=genNotes(lines,comments);
            offtext=lines.join('\n');
            const notefn=lang+'/'+book+'.notes.json';
            const noteout='['+notes.map( ([y,pin,val,id]) =>JSON.stringify({y,id,pin,val})).join(",\n")+']';
            writeChanged(notefn,noteout);    
        }
        const linecount=offtext.split('\n').length;        
        if (writeChanged(lang+'/'+book+namespace+'.off',offtext)) {
            console.log('written',book,'line count',linecount)
        } else {
            console.log('same',book,'line count',linecount)
        }
    })
}
/* generate id sequence of output offtext per book*/
import { writeChanged,nodefs} from 'pitaka/cli'
import { combineJSON, filesOfBook } from './src/bilara-folder.js';
import {sc } from 'pitaka/meta';
import {Breakseg,SEG_START,SEG_BREAK} from './src/breakseg.js'; //see if a sc segment is break

await nodefs
const bilara_folder='../../github/bilara-data/';
const desfolder='idpar/';
const pat=process.argv[2]||"mn";

const pitaka=sc.pitakaOf(pat);
const datafolder=bilara_folder+'root/pli/ms/'+pitaka+'/';   
const books=booksOf(pat);
books.forEach(book=>{
    let files=filesOfBook(book,datafolder);

    console.log(files.slice(0,5),'total files',files.length);
    let bookjson=combineJSON(files.map(fn=>datafolder+fn));
    
    //if (book==='mn1') {
    //    const dn2files=filesOfBook('dn2',datafolder).filter(it=>it.indexOf("dn22")>-1);
    //    bookjson=addMissingSectionMN10(bookjson, JSON.parse(readTextContent(datafolder+dn2files[0])));
	//}
    const out=[];
    let combined='';
    Object.keys(bookjson).forEach(id=>{
        if ( id.match(/[\.:]0\./)|| (id.match(/[\.:]0$/) && 
        (parseInt(bookjson[id])|| bookjson[id]!=='Tassuddānaṁ') )) { //line with leading number and not Uddana has own line
            //is a header
            combined+=id+'\t';
        } else {
            const breaking=Breakseg[id]; //header cannot be break
            out.push(combined+id);      //無論段號在折行前還是後，都要先輸出sc段號
            if (breaking) out.push(breaking.pn?SEG_START:SEG_BREAK) //如果有pn，表示折行後才是段的開始
            combined='';    
        }
    });
    if (combined) out.push(combined);
    const desfn=desfolder+book+'.txt';
    if (writeChanged(desfn,out.join("\n"))) {
        console.log('written',desfn,out.length,'id')
    }
})

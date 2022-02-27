/* generate linecount of each pts paragraph , by sutta, samyutta and nipata*/
const bilara_folder='./bilara-data/';
import { writeChanged,nodefs, kluer, readTextLines} from 'pitaka/cli'
import { combineJSON, filesOf } from './src/bilara-folder.js';
const {yellow} = kluer;
import { sc,cs} from 'pitaka/meta'
await nodefs;
const bkpf=process.argv[2]||"d";

console.log(yellow('syntax'),'node pts-par [dmsa]');
const pitaka=sc.pitakaOf(bkpf);
const datafolder=bilara_folder+'root/pli/ms/'+pitaka+'/';   
const desfolder="pts-par/"
const sutta=cs.suttaOfBookPrefix(bkpf);
const PTS={};
sutta.forEach(suttaid=>{
    let files=filesOf(suttaid,datafolder);
    const json=combineJSON(files.map(fn=>datafolder+fn));
    const suttaID={};
    for (let key in json) {
        const m=key.match(/:([\-\d+])\.(\d+)\.(\d+)/);
        if (m) {
            const [l0,section,n,vakya]=m;
            if (parseInt(n)) suttaID[section+"."+n]=parseInt(vakya);
        } else {
            const m=key.match(/:([\-\d]+)\.(\d+)/); //two level
            if (m) {
                const [l0,n,vakya]=m;
                if (parseInt(n) && parseInt(vakya)) {
                    suttaID[n]=parseInt(vakya);
                }    
            }
        }
    }
    PTS[suttaid]=suttaID;
});
const outfn=desfolder+bkpf+'.json'
if (writeChanged(outfn,JSON.stringify(PTS,'',' '))){
    console.log('written',outfn)
}
/* generate pts pn to vri pn from template*/
/* 依模版(template)產生符合 cs 格式的 offtext 檔 */
import {kluer, writeChanged,nodefs, readTextLines, readTextContent} from 'pitaka/cli'
import { sc } from 'pitaka/meta';
await nodefs;
const template_folder='template/';
let miss=0,hit=0;

export const gen=(pat)=>{
    const books=sc.booksOf(pat);
    books.forEach(book=>{
        const lines=readTextLines(template_folder+book+'.off')
        lines.forEach(line=>{
            const m=line.match(/(\d+)\.1>/);
            if (m) {
                const at=line.indexOf('^n');
                if (at>-1) {
                    const at2=line.indexOf(' ',at);
                    console.log('cs',line.substring(at,at2), 'pts',m[1]);
                    hit++;
                } else {
                    miss++;
                }
            }
        })
    })
};

gen(process.argv[2]);
console.log('has vri pn',hit,'no vri pn',miss)

import { fromIAST } from 'provident-pali';
import Breakseg from  './breakseg.js';
const knowngap={
	'an4.107:1.1':true, // VRI missing an4.106
	'sn23.26:1.1':true,
	'sn45.171:1.1':true,
	'sn48.115-124:1.1':true,'sn48.169-178:1.1':true,'sn49.23-34:1.1':true,
'sn50.45-54:1.1':true,'sn50.89-98:1.1':true,'sn51.77-86:1.1':true,'sn53.45-54:1.1':true,

}
const breakseg=(lang,text,id)=>{
    if (!text)return -1;
    if (Breakseg[id]) {
        const {pli,en}=Breakseg[id];
        let t=pli;
        if (lang==='en') t=en;
        const at=text.indexOf(t);
        if (at>-1) {
            return at;   
        } else {
            throw "breakseq error "+id;
        }
    }
    return -1;
}
const toProvident=(str,lang)=>{
    return lang==='pli'?fromIAST(str):str;
}
export const bilara2offtext=(lang,idseq,bookjson,msdivs,inserts)=>{
    let offtext='';
    for (let i=0;i<idseq.length;i++) {
        const idarr=idseq[i].split('\t');
        let line='';
        for (let i=0;i<idarr.length;i++) {
            const id=idarr[i];

            let text=bookjson[id]||'';
            if (!text) {
                //no translation
            }
            if (lang=='pli') {
                text=text.replace(/n([’”]+)ti/g,'$1nti');
            }
            const msdiv=msdivs[id]||'';
            let insert=inserts[id]||'';
            if (inserts[id]&&typeof insert!=='string') {
                insert=inserts[id][lang]||'';
            }
            if (msdiv) insert='^sc#'+id+insert;
            let addition=insert+(msdiv? ((parseInt(msdiv)?'^n':'')+msdiv):'');

            const brkat=breakseg(lang,text,id);//
            if (brkat>-1) {
                //add one more line
                if (!Breakseg[id].pn&&addition) { // pn moved to first line
                    offtext+=addition+' ';
                    addition='';
                }
                offtext+= toProvident(text.substr(0,brkat),lang)+'\n';
                text=text.substr(brkat);
            }
            line+=(addition?addition+' ':'')+toProvident(text,lang);
        }
        offtext+=line+'\n';
        line='';
    }

    return offtext.trim();
}

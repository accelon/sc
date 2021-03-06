/* old code , use node template*/
import { fromIAST } from 'provident-pali';
import {Breakseg,SEG_START,SEG_BREAK} from  './breakseg.js';
import {cs} from 'pitaka/meta'
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
export const bilara2offtext=(lang,idseq,bookjson,msdivs,inserts,bkid)=>{
    let offtext='';
    for (let i=0;i<idseq.length;i++) {
        const idarr=idseq[i].split('\t');
        if (idarr.length==1 && (idseq[i][0]==SEG_START || idseq[i][0]==SEG_BREAK)) {
            continue; 
        }
        let line='';
        for (let i=0;i<idarr.length;i++) {
            const id=idarr[i];
            //只是為了 idpar行數與off一致 ，折行在breakseg處理


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
            if (msdiv) {
                let cluster=cs.bookParanumToCluster(bkid, msdiv)||'';
                if (cluster) {
                    let vagga='';
                    const sep=(isNaN(parseInt(cluster))?'#':'');
                    if (cluster.match(/\da$/)) {//first vagga
                        vagga='^c'+sep+cluster.substr(0,cluster.length-1);
                    }
                    cluster= vagga+'^c'+sep+cluster;
                }
                insert= '^sc#'+id+insert+cluster;

            }
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
            //因 "an5.308-1152:4.1" 只加入了換行，如果只有換行符而不含標記，那不必補空白
            const extraspace=(addition.indexOf('^')>-1?' ':''); //better check if compact tag
            line+=((addition)?addition+extraspace:'')+toProvident(text,lang);
        }
        offtext+=line+'\n';
        line='';
    }

    return offtext.trim();
}

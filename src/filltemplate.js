/*模版填入，特別要處理sc 的拆行*/
import { pinPos } from "pitaka/align";
import { parseAttrs } from "pitaka/offtext";
import { fromIAST } from 'provident-pali';
export const fillTemplate=(template,bookjson,lang,opts={})=>{
    const conv=lang==='pli'?fromIAST:(a)=>a;
    const extraHeader=opts.extraHeader; //see bb/gen.js
    const comments=opts.comments||{};
    return template.replace(/<([^>]+)>/g,(m,m1)=>{
        const at=m1.indexOf(' ');
        let scid=m1, attrs;
        if (at>0) {
            scid=m1.substr(0,at);
            attrs=parseAttrs(m1.substr(at+1));
        }
        let t=bookjson[scid];
        const comment=comments[scid];

        if (extraHeader&&scid.endsWith('.1')){
           const h=bookjson[scid.replace(/\.1$/,'.0')];
           if (h)t=h+t;
        }
        if (!t) {
            return '';
        }
        if (lang==='pli') t=t.replace(/n([’”]+)ti/g,'$1nti');
        
        if (attrs) {
            const at= attrs[lang]?t.indexOf(attrs[lang]): 0; //some time en is missing , empty line
            if (at==-1) {
                console.error('cannot find break pin',attrs[lang]);
                return '<'+m1+'>';
            }
            return (attrs.copy==='from')?conv(t.substr(at).trimRight()):conv(t.substr(0,at).trimRight());
        }
        if (comment) {
            t+='⚓'+scid+' '
        }
        return conv(t);
    })
    
    return {offtext,comtext};
}
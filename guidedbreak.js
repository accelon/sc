import {spacify,autoBreak,paragraphSimilarity,
    removeHeader,removeVariantBold,
    diffBreak,breakSentence} from "pitaka/utils";


const dumpProblematic=(p1,p2)=>{
    const out=[]
    const max=Math.max(p1.length,p2.length);
    for (let i=0;i<max;i++) {
        out.push((p1[i]||'')+'\t'+p2[i]||'');
    }
    return out;
}

export const guidedBreak=(loc,sclines_o,cslines_o,problematic)=>{
    let pass=false, breakpos=null;
    
    if (!cslines_o.length) {
        console.log('empty cs id',loc)
        return;
    }
    const res=autoBreak(cslines_o);
    const sclines=sclines_o.map(removeHeader);
    const cslines=cslines_o.map(removeHeader).map(removeVariantBold);
    if (sclines.length===res.sentences.length) {
        const sim=paragraphSimilarity(sclines.map(spacify), res.sentences.map(spacify) );
        if (sim<0.03) {
            pass=true;
            breakpos=res.breakpos;
        }
    } 
    if (!pass && sclines.length && cslines.length){

        const diffbreakpos=diffBreak(cslines.map(spacify), sclines.map(spacify));
        const sents=breakSentence(cslines_o,diffbreakpos);
        const sim=paragraphSimilarity(sclines.map(spacify), sents.map(removeVariantBold).map(removeHeader).map(spacify) );
        if (sim<0.1) {
            breakpos=diffbreakpos;
        } else {
            problematic.push(`${loc}\t${sim}`);
            problematic.push( ...dumpProblematic(sclines,sents));
        }    
    }
    return breakpos;
}
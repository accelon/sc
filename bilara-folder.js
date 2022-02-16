import { readTextContent} from 'pitaka/cli'
import { getFilesOfBook } from 'pitaka/csmeta';

export const filesFolders={
    //need ? for matching folder
    pj:["pli-tv-bu-vb/pli-tv-bu-v?-pj","pli-tv-bu-vb/pli-tv-bu-v?-sd",
        "pli-tv-bu-vb/pli-tv-bu-v?-sd","pli-tv-bu-vb/pli-tv-bu-v?-ay","pli-tv-bu-vb/pli-tv-bu-v?-np"],
    pc:["pli-tv-bu-vb/pli-tv-bu-v?-pc","pli-tv-bu-vb/pli-tv-bu-v?-pd",
        "pli-tv-bu-vb/pli-tv-bu-v?-sk","pli-tv-bu-vb/pli-tv-bu-v?-as",
        "pli-tv-bi-vb/pli-tv-bi-v?-pj","pli-tv-bi-vb/pli-tv-bi-v?-sd","pli-tv-bi-vb/pli-tv-bi-v?-np",
        "pli-tv-bi-vb/pli-tv-bi-v?-pc","pli-tv-bi-vb/pli-tv-bi-v?-pd","pli-tv-bi-vb/pli-tv-bi-v?-sk","pli-tv-bi-vb/pli-tv-bi-v?-as"],
    mv:["pli-tv-kd/pli-tv-kd?_",
        "pli-tv-kd/pli-t?-kd10_"],
    cv:["pli-tv-kd/pli-tv-kd{11-19}_",
        "pli-tv-kd/pli-tv-kd2?_"],
    pvr:["pli-tv-pvr/*"],
    dn1:["dn/dn{1-13}"], 
    dn2:["dn/dn{14-23}"],
    dn3:["dn/dn{24-34}"],
    mn1:["mn/mn{1-50}"], //need a wildcard in 50_? for match whole file
    mn2:["mn/mn{51-100}"],
    mn3:["mn/mn{101-152}"],
    sn1:["sn/sn{1-11}"] ,
    sn2:["sn/sn{12-21}"] ,
    sn3:["sn/sn{22-34}"] ,
    sn4:["sn/sn{34-44}"] ,
    sn5:["sn/sn{45-56}"] ,
    an1:["an/an1$"],an2:["an/an2$"],an3:["an/an3$"],an4:["an/an4$"], an5:["an/an5$"],
    an6:["an/an6$"],an7:["an/an7$"],an8:["an/an8$"],an9:["an/an9$"], an10:["an/an10$"],an11:["an/an11$"],
    dhp:["kn/dhp/*"],iti:["kn/iti/vagg?"],ud:["kn/ud/vagg?"],thag:["kn/thag/*"],thig:["kn/thig/*"],
    // kp:["kn/kp/*"],snp:["kn/snp/vagg?"]//no translation yet
}



export const combineJSON=(files=[])=>{
    const out={};
    for (let i=0;i<files.length;i++){
        const fn=files[i];
        let json;
        try{
            json=JSON.parse(readTextContent(fn));
        } catch(e) {
            throw e;
        }
        for (let key in json) {
            if (out[key]) {
                console.log('repeat json key '+key+ ' in '+fn.match(/([^\/]+)$/)[1]);
            } else {
                out[key]=json[key];
            }
        }

    }
    return out;
}

export const filesOfBook=(pat,rootfolder)=>getFilesOfBook(pat,filesFolders,rootfolder);
/*
export const addMissingSectionMN10=(bookjson,dn2json)=>{
    const newjson={},dn22={};
    let start=false;
    for (let key in dn2json) { //extract d22 dhammānupassanā saccapabba
        if (key ==='dn22:17.3') start=true; //start of section
        if (key ==='dn22:21.38') break; //end of section
        if (start) dn22[key]=dn2json[key];
    }
    for (let key in bookjson) {
        if (key=='mn10:44.3') { //replace mn10:44.3 with dn22 section
            for (let addkey in dn22) {
                newjson[addkey]=dn2json[addkey];
            }
        } else {
            newjson[key]=bookjson[key];
        }
    }
    return newjson;
}
*/
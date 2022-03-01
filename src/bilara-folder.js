import { readTextContent} from 'pitaka/cli'
import { sc } from 'pitaka/meta';
import { SEGID_ERRATA } from './segid-errata.js';

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
    sn4:["sn/sn{35-44}"] ,
    sn5:["sn/sn{45-56}"] ,
    an1:["an/an1$"],an2:["an/an2$"],an3:["an/an3$"],an4:["an/an4$"], an5:["an/an5$"],
    an6:["an/an6$"],an7:["an/an7$"],an8:["an/an8$"],an9:["an/an9$"], an10:["an/an10$"],an11:["an/an11$"],
    dhp:["kn/dhp/*"],iti:["kn/iti/vagg?"],ud:["kn/ud/vagg?"],thag:["kn/thag/*"],thig:["kn/thig/*"],
    // kp:["kn/kp/*"],snp:["kn/snp/vagg?"]//no translation yet
}

for (let i=1;i<=56;i++) filesFolders['s'+i]=['sn/sn'+i+'$'];
for (let i=1;i<=34;i++) filesFolders['d'+i]=['dn/dn'+i+'_?'];
for (let i=1;i<=152;i++) filesFolders['m'+i]=['mn/mn'+i+'_?'];
for (let i=1;i<=11;i++) filesFolders['a'+i]=['an/an'+i+'$'];

export const combineJSON=(files=[])=>{
    const out={};
    for (let i=0;i<files.length;i++){
        const fn=files[i];
        let json;
        try{
            if (fs.existsSync(fn)) json=JSON.parse(readTextContent(fn));
        } catch(e) {
            throw e;
        }
        if (json) for (let key in json) {
            let newkey=key;
            if (SEGID_ERRATA[key]) newkey=SEGID_ERRATA[key];
            if (out[newkey]) {
                console.log('repeat json key '+key+ ' in '+fn.match(/([^\/]+)$/)[1]);
            } else {
                out[newkey]=json[key];
            }
        }
    }
    return out;
}

export const filesOf=(pat,rootfolder)=>sc.getFilesOfBook(pat,filesFolders,rootfolder);
import { fstat } from 'fs';
import { filesFromPattern} from 'pitaka/cli'
export const sortFilenames=filenames=>{
	return filenames.sort((f1,f2)=>{
		const m2f1=f1.match(/(\d+)\.(\d+)/);
		const mf1=f1.match(/(\d+)/);
		const m2f2=f2.match(/(\d+)\.(\d+)/);
		const mf2=f2.match(/(\d+)/);
		if (!m2f1||!m2f2) return parseInt(mf1[1])-parseInt(mf2[1]);
		
		return m2f1[1]==m2f2[1]?(parseInt(m2f1[2])-parseInt(m2f2[2])):
			                    (parseInt(m2f1[1])>parseInt(m2f2[1])?1:-1)
	})
}
const AB='abhidhamma',VIN='vinaya';


export const FilesOfBook={
    //need ? for matching folder
    pj:["pli-tv-bu-vb/pli-tv-bu-v?-pj","pli-tv-bu-vb/pli-tv-bu-v?-sd",
        "pli-tv-bu-vb/pli-tv-bu-v?-sd","pli-tv-bu-vb/pli-tv-bu-v?-ay","pli-tv-bu-vb/pli-tv-bu-v?-np"],
    pc:["pli-tv-bu-vb/pli-tv-bu-v?-pc","pli-tv-bu-vb/pli-tv-bu-v?-pd",
        "pli-tv-bu-vb/pli-tv-bu-v?-sk","pli-tv-bu-vb/pli-tv-bu-v?-as",
        "pli-tv-bi-vb/pli-tv-bi-v?-pj","pli-tv-bi-vb/pli-tv-bi-v?-sd","pli-tv-bi-vb/pli-tv-bi-v?-np",
        "pli-tv-bi-vb/pli-tv-bi-v?-pc","pli-tv-bi-vb/pli-tv-bi-v?-pd","pli-tv-bi-vb/pli-tv-bi-v?-sk","pli-tv-bi-vb/pli-tv-bi-v?-as"],
    mv:["pli-tv-kd/pli-tv-kd?_",
        "pli-tv-kd/pli-t?-kd10_"],
    cv:["pli-tv-kd/pli-tv-kd1[123456789]_",
        "pli-tv-kd/pli-tv-kd2?_"],
    pvr:["pli-tv-pvr/*"],
    dn1:["dn/dn?_","dn/dn1[0123]_"], 
    dn2:["dn/dn1[456789]_","dn/dn2[0123]_"],
    dn3:["dn/dn2[456789]_","dn/dn3[01234]_"],
    mn1:["mn/mn?_","mn/mn[1234]?_","mn/mn50_?"], //need a wildcard in 50_? for match whole file
    mn2:["mn/mn5[123456789]_","mn/mn[6789]?_","mn/mn100?"],
    mn3:["mn/mn10[123456789]_","mn/mn1[12345][0123456789]"],
    sn1:["sn/sn?$","sn/sn1[10]$"] ,
    sn2:["sn/sn1[23456789]","sn/sn2[01]$"] ,
    sn3:["sn/sn2[23456789]$","sn/sn3[01234]$"] ,
    sn4:["sn/sn3[56789]$","sn/sn4[01234]$"] ,
    sn5:["sn/sn4[56789]$","sn/sn5[0123456]$"] ,
    an1:["an/an1$"],an2:["an/an2$"],an3:["an/an3$"],an4:["an/an4$"], an5:["an/an5$"],
    an6:["an/an6$"],an7:["an/an7$"],an8:["an/an8$"],an9:["an/an9$"], an10:["an/an10$"],an11:["an/an11$"],
    dhp:["kn/dhp/*"],iti:["kn/iti/vagg?"],ud:["kn/ud/vagg?"],thag:["kn/thag/*"],thig:["kn/thig/*"],
    // kp:["kn/kp/*"],snp:["kn/snp/vagg?"]//no translation yet
}
export const pitakaOf=id=>{
    const pf=id.replace(/\d+$/,'');
    return {pj:VIN,pc:VIN,mv:VIN,cv:VIN,pvr:VIN,vin:VIN,
         ab:AB,ds:AB,dt:AB,kv:AB, pt:AB,pp:AB,vb:AB,ya:AB}[pf] || 'sutta';
}

const BookPrefix={
    vin:"pj,pc,mv,cv,pvr",
    dn:"dn1,dn2,dn3",
    mn:"mn1,mn2,mn3",
    sn:"sn1,sn2,sn3,sn4,sn5",//match subfolder 
    an:"an1,an2,an3,an4,an5,an6,an7,an8,an9,an10,an11",
    ab:"ds,dt,kv,pt,pp,vb,ya",
    kn:"dhp,iti,ud,thag,thig"
}
export const booksOf=id=>{ //id can be separated by "," , or a book prefix
    const idarr=id.split(',');
    const out=[];
    idarr.forEach(id=>{
        const s=BookPrefix[id];
        if (typeof s==='string') {
            out.push(...s.split(","));
        } else {
            out.push(id)
        }
    })
    return out;
}

export const filesOfBook=(pat,rootfolder)=>{
    let folders=FilesOfBook[pat];
    if (!folders) return [];
    if (typeof folders==='string') {
        const out=[];
        folders.split(',').forEach(f=>{
            out.push(... FilesOfBook[f]);
        });
        folders=out;
    }
    const files=[];
    folders.forEach(subfolder=>{
        const f=filesFromPattern(subfolder,rootfolder);
        
        files.push(... sortFilenames(f));
    })
    return files;
}

export const combineJSON=(files=[])=>{
    const out={};
    for (let i=0;i<files.length;i++){
        const fn=files[i];
        let json;
        try{
            json=JSON.parse(fs.readFileSync(fn,'utf8'));
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
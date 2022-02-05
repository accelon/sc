//import by gen-msdiv to generate a patched suttacentre - vri paranum mapping
export default {  //msdiv 與 vri div 不一致
    dn1:{ //bookid
        "dn1:3.74.4":" ",  //blank to pass none null
        "dn1:3.74.5":"msdiv149",
        "dn10:1.3.1":" ",
        "dn10:1.3.2":"msdiv446",    
    },
    mn1:{
        "mn9:60-62.1":" ",
        "mn9:60-62.2":"msdiv102",
    },
    mn2:{
        "mn75:25.2":" ",
        'mn75:25.3':"msdiv221",
        "mn89:4.4":"msdiv365",
        "mn89:5.1":" ",
    },
    an1:{
        "an1.171:1.1":"msdiv171", //misstype to msdiv17, bilara-data issue #220

    },
    an4:{
        "an4.106:1.1": "msdiv106", //no root and translated text
    },
    sn3:{
        "sn23.25:1.1":"msdiv184", //missing in sn23.23-33_reference
    },
    sn5:{
        "sn45.170:2.1":"msdiv171",
        //fill the gap
        "sn48.71-82:1.1": "msdiv541-586",//"msdiv541-552",
        "sn48.125-136:1.1": "msdiv597-640",//"597-608",
        "sn49.1-12:1.1": "msdiv651-672",//"651-662",
        "sn50.1-12:1.1": "msdiv705-748",//"705-716",
        "sn50.55-66:1.1": "msdiv759-791",//"759-770",
        "sn51.33-44:1.1": "msdiv845-888",//"845-856",
        "sn53.1-12:1.1": "msdiv923-966",//"923-934",

    }
}

//import by gen-msdiv to generate a patched suttacentre - vri paranum mapping
export default {  //msdiv 與 vri div 不一致
    dn1:{ //bookid
        "dn1:3.74.4":" ",  //blank to pass none null
        "dn1:3.74.5":"msdiv149",
        "dn10:1.3.1":" ",
        "dn10:1.3.2":"msdiv446",    
    },
    dn2:{
        "dn19:61.1":" ",
        "dn19:60.11":"msdiv329"
    },
    mn1:{
        "mn9:60-62.1":" ",
        "mn9:60-62.2":"msdiv102",
        "mn10:44.1":" ",
        //dhammānupassanā saccapabba is missing in SC
        "dn22:17.1": "msdiv119",//"386",
        "dn22:18.1": "msdiv120",//"387",
        "dn22:18.3": "msdiv121",//"388",
        "dn22:18.6": "msdiv122",//"389",
        "dn22:18.9": "msdiv123",//"390",
        "dn22:18.12": "msdiv124",//"391",
        "dn22:18.15": "msdiv125",//"392",
        "dn22:18.18": "msdiv126",//"393",
        "dn22:18.21": "msdiv127",//"394",
        "dn22:18.24": "msdiv128",//"395",
        "dn22:18.27": "msdiv129",//"396",
        "dn22:18.30": "msdiv130",//"397",
        "dn22:18.33": "msdiv131",//"398",
        "dn22:18.48": "msdiv132",//"399",
        "dn22:19.1": "msdiv133",//"400",
        "dn22:20.1": "msdiv134",//"401",
        "dn22:21.1": "msdiv135",//"402",
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
        //簡單處理段號空隙。552暫時先擴大到586，應該是補一個空段 553-586
        "sn48.125-136:1.1": "msdiv597-640",//"597-608",
        "sn49.1-12:1.1": "msdiv651-672",//"651-662",
        "sn50.1-12:1.1": "msdiv705-748",//"705-716",
        "sn50.55-66:1.1": "msdiv759-791",//"759-770",
        "sn51.33-44:1.1": "msdiv845-888",//"845-856",
        "sn53.1-12:1.1": "msdiv923-966",//"923-934",

    }
}

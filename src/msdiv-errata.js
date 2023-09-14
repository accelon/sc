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
        "mn10:44.1":"msdiv119-135",
        //2022/02/13 decided to remove cs 119-135 , as no commentary and no corresponding translation
        //dhammānupassanā saccapabba is missing in SC
        // "dn22:17.1": "msdiv119",//"386",
        // "dn22:18.1": "msdiv120",//"387",
        // "dn22:18.3": "msdiv121",//"388",
        // "dn22:18.6": "msdiv122",//"389",
        // "dn22:18.9": "msdiv123",//"390",
        // "dn22:18.12": "msdiv124",//"391",
        // "dn22:18.15": "msdiv125",//"392",
        // "dn22:18.18": "msdiv126",//"393",
        // "dn22:18.21": "msdiv127",//"394",
        // "dn22:18.24": "msdiv128",//"395",
        // "dn22:18.27": "msdiv129",//"396",
        // "dn22:18.30": "msdiv130",//"397",
        // "dn22:18.33": "msdiv131",//"398",
        // "dn22:18.48": "msdiv132",//"399",
        // "dn22:19.1": "msdiv133",//"400",
        // "dn22:20.1": "msdiv134",//"401",
        // "dn22:21.1": "msdiv135",//"402",
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

    	"sn34.46:1.9":"", // chacattālīsamaṃ belongs to 707
    	"sn34.47:1.1":"msdiv708",
        "sn34.47:1.3":"",
        "sn34.48:1.1":"msdiv709", //Samādhismiṁ
        "sn34.48:1.2":"",
        "sn34.49:1.1":"msdiv710",//Samādhismiṁ

        "sn34.50:1.8":"",
        "sn34.51:1.1":"msdiv712",
        "sn34.51:1.2":"",
        "sn34.52:1.1":"msdiv713",
        "sn34.53:1.8":"",
        "sn34.54:1.1":"msdiv715",
    },
    sn5:{
        "sn45.170:2.1":"msdiv171",
        //fill the gap


                //簡單處理段號空隙。552暫時先擴大到586，應該是補一個空段 553-586

        // "sn48.71-82:1.1": "msdiv541-586",//"msdiv541-552",
        // "sn48.125-136:1.1": "msdiv597-640",//"597-608",
        // "sn50.55-66:1.1": "msdiv759-791",//"759-770",
        // "sn51.33-44:1.1": "msdiv845-888",//"845-856",
        // "sn53.1-12:1.1": "msdiv923-966",//"923-934",

        "sn48.115-124:0.2":"msdiv553-586\n", // sn48.115-124:0.1 被去掉，見template.js搜尋 0:1
        "sn48.137-146:0.2":"msdiv609-640",   //sn48.137-146:0.1
        "sn50.67-76:0.2":"msdiv771-791",
        "sn51.77-86:0.2":"msdiv857-888\n",
        "sn53.45-54:0.2":"msdiv935-966\n", //sn53.45-54:0.1 also inject 967-976, add \n to separate two ^n

//        "sn49.1-12:1.1": "msdiv651-672",//"651-662",
		"sn49.13-22:1.1":"msdiv663-672",// pseudo paranum , //added in s0305m.mul <p rend="centre">(appamādavaggo sammappadhānavasena vitthāretabbo)।</p>			
//        "sn50.1-12:1.1": "msdiv705-748",//"705-716",
		"sn50.13-22:1.1":"msdiv717-748",//added in s0305m.mul<p rend="centre">appamādavaggo <pb ed="V" n="3.0323"/> vitthāretabbo।</p>
			
        	
        

    }
}

﻿/*如果要補行，必須在最後 ，這樣 ^n 才會在下行的開頭 ，見 template.js hassubpara 部份*/
export default {
"dn1:0.2":"^ak#dn(Long Discourses) ^bk#dn1(Long Discourse1) ",
"dn14:0.2":"^bk#dn2(Long Discourse2) ",
"dn24:0.2":"^bk#dn3(Long Discourse3) ",

"mn1:1.1":"^ak#mn(Middle Discourses) ^bk#mn1",
//"mn10:45.1": "^n120-135\n",  insert from dn22
// "mn50:33.0":{pli:"sAlEyVyvgVgO nIWVXItO pYVcmO.\n",en:""}, //VRI 有，MS無

"mn50:33.0":"\n", //missing "sAlEyVyvgVgO nIWVXItO pYVcmO.\n"
"mn51:1.1":"^bk#mn2",
"mn101:1.1":"^bk#mn3",
"sn1.1:0.2":"^ak#sn(Connected Discourses)",
"sn1.1:1.1":"^bk#sn1",
"sn12.1:1.1":"^bk#sn2",
"sn14.1:0.1":"\n",// sc missing ^n ^trailer aBIsmysMyUtVtM smtVtM।
"sn22.1:1.1":"^bk#sn3", 
"sn23.22:1.9":"\n",//sc missing  rADsMyUtVtsVs
"sn35.1:1.1":"^bk#sn4",
"sn45.1:1.1":"^bk#sn5",
"sn50.55-66:0.1":"\n\n\n\n\n", //SC missing uddana for sn50 5. Oghavagga 
//missing sn55
"an1.1:0.2":"^ak#an(Numbered Discourses)",
"an1.1:1.1":"^bk#an1",
"an1.378-393:0.1":"\n",//SC missing trailer ekDmVmpALI sOLsmO।
"an1.394:0.1":"\n",//SC missing trailer psAdkrDmVmvgVgO stVtrsmO।
"an2.1:1.1":"^bk#an2",
"an3.1:1.1":"^bk#an3",
"an4.1:1.1": "^bk#an4",
"an5.1:1.1": "^bk#an5",
//讓"an5.308-1152:4.0": "Tatridaṁ vagguddānaṁ", 之後換行，
//避免無前綴數字的標題和本文合為一行，見 gen-idseq.js 搜尋 Tassuddān
"an5.308-1152:4.1":"\n", 
"an6.1:1.1": "^bk#an6",
"an7.1:1.1": "^bk#an7",
"an8.1:1.1": "^bk#an8",
"an9.1:1.1": "^bk#an9",
"an10.1:1.1": "^bk#an10",
"an11.1:1.1": "^bk#an11",
}
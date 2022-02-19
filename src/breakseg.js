export const Breakseg= { //將segment再切分
  "dn3:2.14.1": { pli:"Ekamantaṁ",en:" and sat",pn:"290",my:""}, // pn非空值，表示折行後才是cs段起點
  "dn3:2.17.1": { pli:"Ekamantaṁ",en:" he sat",pn:"293",my:""},  // pn的值只是註解作用
  "dn5:5.5":{pli:" upasaṅkamitvā",en:" and said",pn:"331"},       // sc id 號到 vri 段號從 msdiv/*.json 獲得
  "dn6:5.3":    { pli:"Ekamantaṁ",en:" and sat",pn:"364",my:""},
  "dn10:1.5.1":{pli:"Atha kho subho",en:"Then Subha"}, //如果沒有pn ，則只是折行

  "dn14:1.32.7":{ pli:"Ayañhi" , en:"",pn:"35",my:""}, // vri dn2.35 從 ayañhi, deva, kumāra 開始
  "dn14:3.31.3":{pli:"Ekamantaṁ", en:"",pn:"92"}, //break for align with VRI

  "mn52:3.1":{ pli:"Ekamantaṁ" ,en:" sat",pn:"18"},
  "mn60:3.1":{ pli:"Ekamantaṁ" ,en:"The Buddha",pn:"93"}, 
  "mn66:5.1":{ pli:"Ekamantaṁ" ,en:" sat down",pn:"149"},
  "sn7.2:2.1":{pli:"Evaṁ vutte",en:"When he",pn:"188"},
  "sn46.54:7.1":{pli:"Atha kho mayaṁ",en:"",pn:"235"}, //no translation yet
  "sn52.2:2.1":{pli:"Atha kho āyasmā mahāmoggallāno āyasmantaṁ",en:" and said",pn:"900"},
  "an8.19:13.1":{pli:"Kiñcāpi",en:"Even if",pn:""},
}

// 產生的 pli.id/mn2.js ， seg id 會重覆。
// mn52:3.1
// mn52:3.1	18

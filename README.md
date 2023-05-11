# sc
    suttacentral 經文轉 offtext 格式

## 檔案說明
    template.js            產生模版
    gen-pl.js              產生巴利經文
    gen-ro.js              產生巴利經文 羅馬轉寫  // 複製到 dhamma.github.io/sc-ro/ 供 accelon/aligner 使用
    gen-en.js              產生英譯經文

    以下檔案修改後再重新node template
    src/inserts.js         每個json id 要補入的文字，主要是冊名標記
    src/breakseg.js        sc 長段拆行
    src/msdiv-errata.js    修正 suttacentral msdiv 段號錯誤
    src/bilara-folders.js  每一冊的詳細路徑

## 步驟

產生 sc id 輸出引導檔 (template/*.off)， 引導檔行數和產生的經文行數一致。少數sc段包括了超過一個cs的段(含無號段)，必須拆行，見breakseg.js

    node template [pat]

產生巴利經文, outdir ./pli (須有idseq 及 msdiv)

    node gen-pli [pat]

產生英譯  outdir ./en

    node gen-en [pat]

pat ( 詳見書名代碼 github.com/accelon/cs/src/newname.js )
  
    例：  dn  長部, mn 中部 , sn 相應部 , an 增支部 ，dn1 長部第一冊

## sc 格式與 offtext 格式轉換說明

sc 格式 bilara-data/translation/en/sujato/sutta/dn/dn1_translation-en-sujato.json
    
    {"dn1:0.1": "Long Discourses 1 ",   //大標，冊名
    "dn1:0.2": "The Prime Net ",          //中標，經名
    "dn1:0.3": "1. Talk on Wanderers ",   //小標 ，章節名
    "dn1:1.1.1": "So I have heard. ",
    "dn1:1.1.2": "At one time the Buddha was "...
    
模版: 

    <dn1:0.2><dn1:0.3>^bk#dn1^ck#d1^n1 <dn1:1.1.1>
    <dn1:1.1.2>
    ...

尖括號會替代為 bilara json 中的文字，最終結果為:

    The Prime Net 1. Talk on Wanderers ^bk#dn1^ck#d1^n1 So I have heard. 
    At one time the Buddha was ...

每一文字行對應一句，^n 為段落 (即vri的＜p＞) 。^bk 為冊號，^ck 為經號。

為了定位方便和查找方便，連續的標題(大標中標小標）合併為一行。^n 之前的文字一律視為標題。

cs 的定位符為 bk.n:sentence ，即 「冊號.段號:第幾句」 ，同冊段號不重覆。例:　dn1.1 表示長部第1冊第1段，第0句可省略。 
dn1.1:1 表示往下一句，即"At one time the Buddha was..."，

其他數據庫的定位加上名稱前綴，
    
    cs:dn1.1     //巴利藏
    sc:dn1.1     //英譯
    ccc:dn1.1    //莊春江

## 依SC將 CS 分句的步驟 (進階動作)

    在本目錄sc 產生 off 經文
    在cs工作目錄 先產生未分句(一段一行)的經文 `node gen p` 在 cs/par/*
        `node align-sent` 產生 ../cs/off/* (一句一行)
        用 `pitaka compare off/dn1.off  ../sc/pli/dn1.off` 列出差異處
        滿意後 在cs `pitaka pin` 產生 ../cs/brk/ 文字檔，每段對一行，每行的分句起點以 tab 隔開。
    往後若 sc 經文有變或分段方式改變，須重跑以上步驟。

    重新 `node gen-pli` 會讀取cs/brk下對應的檔案，輸出符合sc的分句結果。
    hook 大約為off 檔的5%以下，必須git。
    若cs 經文有變，或要手工修改分句，修改 off/*.off 後，再 `pitaka pin` 覆蓋 brk/* 檔案。

## 分句原則
    關於 cs 版的定位方式，請見 cs/README.md
	sc reference 的 msdiv段號(泰國版) 和 vri 稍有出入，原則上以 vri 版為準，
	除了增支部11集 (502~671) 段(vri 版缺 an11.502-981 經文) ,
    詳見 github.com/accelon/cs/src/ro-errata.js 's0404m4.mul.xml' 部份)

    少數情況巴利文很長，並含句槓(danda)，但譯文短故，故巴利文合併成一句。未來應拆分。
    如
    "upasaṅkamitvā bhagavantaṁ abhivādetvā ekamantaṁ nisīdi.
     Ekamantaṁ nisinno kho kevaṭṭo gahapatiputto bhagavantaṁ etadavoca:" 常常接在一起。
   
    VRI 有分段的地方，幾乎都有SC分句，只有少數例外，詳見 breakseg.js
   
## 全域改動
    為配合provident 不得以輔音結尾之規定

    n’ti 改為 ’nti
    n”ti 改為 ”nti


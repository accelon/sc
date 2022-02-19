# sc
    suttacentral 經文轉 offtext 格式

## 檔案說明
    template.js            產生模版
    gen-pl.js              產生巴利經文
    gen-en.js              產生英譯經文

    以下檔案修改後再重新node template
    src/inserts.js         每個json id 要補入的文字，主要是冊名標記
    src/breakseg.js        sc 長段拆行
    src/msdiv-errata.js    修正 suttacentral msdiv 段號錯誤
    src/bilara-folders.js  每一冊的詳細路徑

## 步驟
    node template
    產生 sc id 輸出引導檔 (template/*.off)
    引導檔行數和產生的經文一致。
    少數sc段包括了超過一個cs的段(含無號段)，必須拆行，見breakseg.js

    產生巴利經文, outdir ./pli (須有idseq 及 msdiv)
    node gen-pli

    產生英譯  outdir ./en
    node gen-en


## 依SC將 CS 分句的步驟

    在本目錄sc 產生 off 經文
    在cs工作目錄 先產生未分句(一段一行)的經文 `node gen p` 在 cs/par/*
        `node align-sent` 產生 ../cs/off/* (一句一行)
        用 `pitaka compare off/dn1.off  ../sc/pli/dn1.off` 列出差異處
        滿意後 在cs `node pin-brk ` 產生 ../cs/brk/ 文字檔，每段對一行，每行的分句起點以 tab 隔開。
    往後若 sc 經文有變或分段方式改變，須重跑以上步驟。

    重新 `node gen-pli` 會讀取cs/brk下對應的檔案，輸出符合sc的分句結果。
    hook 大約為off 檔的5%以下，必須git。
    若cs 經文有變，或要手工修改分句，修改 off/*.off 後，再 `node pin-brk` 覆蓋 brk/* 檔案。

## 分段
    關於 cs 版的定位方式，請見 cs/README.md
	sc 的msdiv段號和 vri 稍有出入，原則上以 vri 版為準，
	除了增支部11集 (502~671) 段(vri 版缺 an11.502-981 經文) ,
    詳見 ro-errata.js 's0404m4.mul.xml' 部份)

    少數情況巴利文很長，並含句槓(danda)，但譯文短故，故巴利文合併成一句。如
    "upasaṅkamitvā bhagavantaṁ abhivādetvā ekamantaṁ nisīdi.
     Ekamantaṁ nisinno kho kevaṭṭo gahapatiputto bhagavantaṁ etadavoca:" 常常接在一起。
   
    VRI 有分段的地方，幾乎都有SC分句，只有少數例外，詳見 breakseg.js
   
## 全域改動
    n’ti 改為 ’nti
    n”ti 改為 ”nti

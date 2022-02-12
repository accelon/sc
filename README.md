# sc
suttacentral to offtext
## 檔案說明
inserts.js 每個json id 要補入的文字
## steps

    產生 sc id 輸出引導檔 (idseq/*.txt) ，一行多個id 以\t 隔開
    node gen-idseq 

    產生 json id 與msdiv (即vri 段號)對照表。
    node gen-msdiv


    產生巴利經文, outdir ./pli (須有idseq 及 msdiv)
    node gen-pli

    產生英譯  outdir ./en
    node gen-en


## 依SC將 CS 分句的步驟

    在cs工作目錄 先產生未分段的 off  `node gen-pli` 
    在本目錄sc 產生 off `node gen`
    `node break-cs` 產生 ../cs/break-by-sc
    回cs 工作目錄，比較 cs/breakby-sc/?.off 與 sc/pli/?.off
    用 `pitaka compare ../cs/break-by/sc/dn1.off  ../sc/pli/dn1.off` 列出差異處
    滿意後 在cs `node breakhook ` 產生 cs/breakhook/ 文字檔，每段對一行，每行的分句點以 tab 隔開。
    往後若 sc 經文有變或分段方式改變，須重跑以上步驟。

    重新 `node gen-pli` 會讀取breakhook 下對應的檔案，輸出符合sc 的分句結果。
    hook 大約為off 檔的5%以下，必須git。
    若cs 經文有變，或要手工修改分句，修改 off/ 中的文字後，再 `node rehook` 覆蓋 breakhook 檔案。 off/ 自動產生不必git。

## 分段
    關於 cs 版的定位方式，請見 cs/README.md
	sc 的msdiv段號和 vri 稍有出入，原則上以 vri 版為準，
	除了增支部11集 (502~671) 段(vri 版缺 an11.502-981 經文) ,詳見 ro-errata.js 's0404m4.mul.xml' 部份)

   少數情況巴利文很長，並含句槓(danda)，但譯文短故，故巴利文合併成一句。如
   "upasaṅkamitvā bhagavantaṁ abhivādetvā ekamantaṁ nisīdi. Ekamantaṁ nisinno kho kevaṭṭo gahapatiputto bhagavantaṁ etadavoca:" 常常接在一起。
   
   VRI 有分段的地方，幾乎都有SC分句，只有少數例外，詳見 breakseg.js
   
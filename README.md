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


# sc
suttacentral to offtext

## steps

    產生 sc id 輸出引導檔 (idseq/*.txt) ，一行多個id 以\t 隔開
    node gen-idseq 

    讀 reference msdiv (即vri 段號)，與其他offtag (如經號等)。產生每個id 要補入的文字。輸出(inserts/*.txt)
    node gen-inserts

    產生巴利經文 (須有idseq 及 inserts)
    node gen-pli

    產生英譯
    node gen-en

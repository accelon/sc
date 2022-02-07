import {nodefs} from 'pitaka/cli';
await nodefs;
import {openBasket} from 'pitaka'
const ptk= await openBasket('sc-pli');
debugger
const ranges=ptk.getPageRange('an1.232');
let hlines=await ptk.readLines(ranges[0],ranges[1]-ranges[0]);
console.log(hlines,ptk.locOf(ranges[0]+6))
console.log(ptk.clusterOf(ranges[0]+6))
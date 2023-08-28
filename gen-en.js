const pat=process.argv[2]||'sn'
import {gen} from "./src/gen.js"
gen(pat,"en");

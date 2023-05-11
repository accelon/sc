const pat=process.argv[2]||'an1'
import {gen} from "./src/gen.js"
gen(pat,"ro");
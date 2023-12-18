import axios from "axios";
axios.get('https://fooapi.com')


// 誰かがd.tsを作っていないか調べる（googleで）
// node_modules/@types/node の中に入れる
// $ npm install --save-dev @types/lodash
// $ npm uninstall --save-dev @types/lodash でアンインストールできる
import _ from 'lodash';
_.shuffle([1, 2, 3, 4]);

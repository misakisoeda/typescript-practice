import axios from "axios";
axios.get('https://fooapi.com')


// 誰かがd.tsを作っていないか調べる（googleで）
// node_modules/@types/node の中に入れる
// $ npm install --save-dev @types/lodash
// $ npm uninstall --save-dev @types/lodash でアンインストールできる

// import _ from 'lodash';  // <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script> CDNで読み込んだのでコメントアウト
// _.shuffle([1, 2, 3, 4]);

// CDNで読み込んだ場合は、tsconfig.jsonの"noEmitOnError"も削除する
console.log(_.shuffle([1, 2, 3, 4]));

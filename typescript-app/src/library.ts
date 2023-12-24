import axios from "axios";
axios.get('https://fooapi.com')
// declare => どこかでその変数が使われているよという意味。見せかけ。実際の変数になってはいない。
// declare global <= どこでも使える。セットで覚える。中に書いたinterfaceも自動でdeclareに入る。

// 誰かがd.tsを作っていないか調べる（googleで）
// node_modules/@types/node の中に入れる
// $ npm install --save-dev @types/lodash
// $ npm uninstall --save-dev @types/lodash でアンインストールできる

// import _ from 'lodash';  // <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script> CDNで読み込んだのでコメントアウト
import _, { hello } from 'lodash';  // <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script> CDNで読み込んだのでコメントアウト
type hi = hello;
_.shuffle([1, 2, 3, 4]);

// CDNで読み込んだ場合は、tsconfig.jsonの"noEmitOnError"も削除する
// console.log(_.shuffle([1, 2, 3, 4]));

namespace myApp {
    const hello = 'hello in namespace';
    export const name = 'Quill';
    export interface Nameable {
        name: string;
    }
}
// const hello = 'hello in global'
const hello = myApp.name;
let nameable: myApp.Nameable;   // ←「.」が使われているということは、namespaceが使われている。覚えておいた方が良い


// 同じ名前の値、型、namespace は共存できる（同じ値、型同士はエラーにはなる）
// let name: string;
// function name() {}
// enum name {}
class name {}   // (例外1)　interfaceとclassはOK（classはinterfaceの扱いを受けるから）
interface name {}   // (例外2)interfaceは同じものを何回も使える＝最終的にマージしてくれる。
                    // 同名のプロパティは同じ型のみOK.同名のメソッドはオーバーロード（下に書かれたものが優先される（CSSと同じ））
// type name = {}
namespace name {    //(例外3)値を含んでいるので、 let name: string;(変数)はエラーになる。  オブジェクトに変換される
                    //(例外4)namespace同士OK
    export const first: string = 'Peter';   // 値を含んでいるので、値としての役割もある // exportしない限りはマージされるので同じ名前でOK
}

// declare namespace の中は、必ず型しか入れれない
// ↓↓↓
// interface => 拡張しやすい
// type => 拡張できない

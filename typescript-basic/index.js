// let hasValue: boolean = true;
// let count: number = 10;
// let float: number = 3.14;
// let negative: number = -0.12;
// let singe: string = 'hello';
// let double: string = "hello";
// let back: string = `hello`;
// : string ←型注釈
// 下部のように基本は型推論が良い
// 型推論が出来ない場合型注釈をつける
var hasValue = true;
var count = 10;
var float = 3.14;
var negative = -0.12;
var singe = 'hello';
var double = "hello";
var back = "hello";
// オブジェクト
var person = {
    name: 'Jack',
    age: 21
};
// Array型
var fruits = ['Apple', 'Banana', 'Grape'];
var fruit = fruits[0];
// fruit.reduce();
// Tuple型　必ず型注釈をする必要がある。
// 決まった内容の配列を作る
var book = ['business', 1500, false];
book.push(21); //←エラーは出てくれない
//console.log(book[3]);   //←正しここでエラーを出す
// Enum 列挙型
// enumの場合はパスカルケースで書く
// enumの場合は値は全部大文字にする
// enumは「オブジェクト」
// enum CoffeeSize {
//     SHORT = 'SHORT',
//     TALL = 'TALL',
//     GRANDE = 'GRANDE',
//     VENTI = 'VENTI'
// }
// valueの文字列を省略できる 正し数字になる
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize[CoffeeSize["SHORT"] = 0] = "SHORT";
    CoffeeSize[CoffeeSize["TALL"] = 1] = "TALL";
    CoffeeSize[CoffeeSize["GRANDE"] = 2] = "GRANDE";
    CoffeeSize[CoffeeSize["VENTI"] = 3] = "VENTI";
})(CoffeeSize || (CoffeeSize = {}));
var coffee = {
    hot: true,
    size: CoffeeSize.TALL
};
// any型
// JSからの移行前とかに使うのみ
var anything = true;
anything = 'hello';
// Union型
var unionType = 10;
var unionTypes = [21, 'hello']; //配列
// unionType.toUpperCase(); //←今数字が入っているのでエラーになる
unionType = 'hello';
unionType.toUpperCase();
// Literal型
// 特定の決まった値だけ使う
// constにするとLiteral型
// letにするとstring型
// 2-3個くらいならEnumじゃなくてこっちでも良さそう
var apple = 'apple';
var trueType = true;
var clothSize = 'large'; //enumみたいに使える
// ↓
var cloth = {
    color: 'white',
    size: 'medium'
};
var clothSize2 = 'large';
// ↓
var cloth2 = {
    color: 'white',
    size: 'medium'
};
// 関数に型をつける
// パラメータには型推論が効かない（anyになる）のでしっかり設定する
function add(num1, num2) {
    return num1 + num2;
}
;
add(3, 2);
// 関数の戻り値 void型（何も返さない=undefined型）
// undefined　= return; を書いたときは使える（だがundefinedは基本使わない）
// null型もあることを覚えておく
function sayHello() {
    console.log('Hello!');
}
var tmp;
// 関数の型注釈
// 関数定義は:だが型注釈は=>になる
var anotherAdd = add;
// const anotherAdd2 = function add(num1: number, num2: number): number {
//     return num1 + num2;
// };
// const anotherAdd3: (n1: number, n2: number) => number = function (num1, num2) {
//     return num1 + num2;
// };
// ↑左右にどちらか型指定があれば大丈夫
var doubleNumber = function (number) { return number * 2; };
// const doubleNumber2 = (number: number): number => number * 2;
// const doubleNumber3: (num: number) => number = num => num * 2;
// ↑下の方が良さそう
// callback関数の型
// => number を => void にすると型定義しても無視されるので注意する
function doubleAndHandle(num, cb) {
    var doubleNum = cb(num * 2);
    console.log(num * 2);
}
doubleAndHandle(21, function (doubleNum) {
    return doubleNum;
});
// unknown型
// any型より少し厳しい程度
// 使用するときだけ厳しくなる
var unknownInput;
var anyInput;
var text;
// text = unknownInput; ←anyと違ってエラーが出る
// if文で型を確かめて使用する
if (typeof unknownInput === 'string') {
    text = unknownInput;
}
// never型
// 決して何も返さない
function error(message) {
    throw new Error(message);
    // while (true) {}
}
// console.log(error('error')); //エラーが出ているが、何も返さない

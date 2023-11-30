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
var person = {
    name: 'Jack',
    age: 21
};
var fruits = ['Apple', 'Banana', 'Grape'];
var fruit = fruits[0];
// fruit.reduce();
// Tuple型　必ず型注釈をする必要がある。
// 決まった内容の配列を作る
var book = ['business', 1500, false];
book.push(21); //←エラーは出てくれない
//console.log(book[3]);   //←正しここでエラーを出す
// Enum 列挙型
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize["SHORT"] = "SHORT";
    CoffeeSize["TALL"] = "TALL";
    CoffeeSize["GRANDE"] = "GRANDE";
    CoffeeSize["VENTI"] = "VENTI";
})(CoffeeSize || (CoffeeSize = {}));
var coffee = {
    hot: true,
    size: CoffeeSize.TALL
};
console.log(person.name);

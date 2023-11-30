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

let hasValue = true;
let count = 10;
let float = 3.14;
let negative = -0.12;
let singe = 'hello';
let double = "hello";
let back = `hello`;


// オブジェクト
const person: {
    name: string;
    age: number;
} = {
    name: 'Jack',
    age: 21
}


// Array型
const fruits: string[] = ['Apple', 'Banana', 'Grape']
const fruit = fruits[0];
// fruit.reduce();


// Tuple型　必ず型注釈をする必要がある。
// 決まった内容の配列を作る
const book: [string, number, boolean] = ['business', 1500, false]
book.push(21)   //←エラーは出てくれない
//console.log(book[3]);   //←正しここでエラーを出す


// Enum 列挙型
// enumの場合はパスカルケースで書く
// enumの場合は値は全部大文字にする

// enum CoffeeSize {
//     SHORT = 'SHORT',
//     TALL = 'TALL',
//     GRANDE = 'GRANDE',
//     VENTI = 'VENTI'
// }
// valueの文字列を省略できる 正し数字になる
enum CoffeeSize {
    SHORT,
    TALL,
    GRANDE,
    VENTI'
}
const coffee = {
    hot: true,
    size: CoffeeSize.TALL
}


// any型
// JSからの移行前とかに使うのみ
let anything: any = true;
anything = 'hello'


console.log(person.name);

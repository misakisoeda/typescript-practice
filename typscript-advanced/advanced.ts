interface Engineer {
    // kind: 'enginner';    //タグ付きユニオン
    name: string;
    role: string;
}
interface Blogger {
    // kind: 'blogger'; //タグ付きユニオン
    name: string;
    follower: number;
}

// type EngineerBlogger = Engineer & Blogger;   //今回はこれの方が綺麗
interface EngineerBlogger extends Engineer, Blogger {}


const quill: EngineerBlogger = {
    name: 'Quill',
    role: 'front-end',
    follower: 1000
}

type tmp = string & number; //neverになる。テスト

type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber;    //重なっているnumber型になる


// ■Type guard（jsにある機能）
// １）
function toUpperCase(x: string | number) {
    if (typeof x === 'string') {
        return x.toLocaleUpperCase();
    }
    return '';
}

// ２）
type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
    console.log(nomadWorker.name);
    // if (typeof nomadWorker === 'object')  //←typeof は7つしか結果を返してくれない
    if ('role' in nomadWorker) {  //←role というキーがある場合という意味
        console.log(nomadWorker.role);
    }
    if ('follower' in nomadWorker) {
        console.log(nomadWorker.follower);
    }
}

// ３）
class Dog {
    kind: 'dog' = 'dog';    //タグ付きユニオン
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    kind: 'bird' = 'bird';  //タグ付きユニオン
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}
type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak();
    switch (pet.kind) { //タグ付きユニオンの場合、switch文などでわかりやすくな
        case 'bird':
            pet.fly();
    }
    if (pet instanceof Bird) {  //Birdクラスから生成されたオプジェクトだった場合（この場合、interfaceはだめ。理由はjsになった時に消えるから）
        pet.fly();
    }
}
havePet(new Dog());
havePet(new Bird());
// havePet({ speak() { console.log('hello') }, fly() { console.log('not fly')}});  //=>instanceofはBirdクラスから生成されたインスタンスでないとだめ


// ■型アサーション
// <input id="input">
// const input = document.getElementById('input'); //文字列を取っているだけなのでnullの可能性を示す。inputということを指示する必要がある。
const input1 = <HTMLInputElement>document.getElementById('input'); //手法1
const input2 = document.getElementById('input') as HTMLInputElement; //手法2 ★!!Reactを使う時はこっちでかく（jsxを使用するので）
input2.value = 'initial input value1';
// ↓1行でもOK
(<HTMLInputElement>document.getElementById('input')).value = 'initial input value';
(document.getElementById('input') as HTMLInputElement).value = 'initial input value';


// ■Non-null
// const input3 = document.getElementById('input') as HTMLInputElement;
const input3 = document.getElementById('input')!;   //↑と同じ意味　if文なくても楽に書ける


// ■インデックスシグネチャ（基本的には使わない）
interface Designer {
    name: string;
    [index: string]: string;    //他の物もstringにする必要がある。（name: number　とかに出来ない）
    // [index: string]: string;    //[index: string]→キーは数字でもナンバーでもOK [index: number]→キーは数字だけOK
}
const designer: Designer = {
    name: 'Quill',
    role: 'web',
    like: 'fa'
}
console.log(designer.id); //なんでもOKになってしまうので気をつける必要がある


// ■関数のオーバーロード
function toUpperCase2(x: string): string;   // 上から順番に適応されている
function toUpperCase2(x: number): number;
function toUpperCase2(x: string | number) { //関数のオーバーロードをしたときは、ここは無視される
    if (typeof x === 'string') {
        return x.toLocaleUpperCase();
    }
    return x;
}
const upperHello = toUpperCase2('hello');
// const upperHello = toUpperCase2('hello') as string; //使うたびに書くのは面倒

// あえて書いてみる
interface TmpFunc {
    (x: string): number;
    (x: number): number;
}
const upperHello2: TmpFunc = function (x: string | number) { return 0 };
upperHello2('hi')
upperHello2(32)

// 関数のインターセクション型
// interface FuncA {
//     (a: number, b: number): number;
//     (a: string, b: number): number;
// }
// interface FuncB {
//     (a: string): number;
// }
// let intersectionFunc: FuncA & FuncB;    //　最初に書いた方が優先される
// intersectionFunc = function(a: number | string, b?: number | string) { return 0 }

// ユニオン型
interface FuncA {
    (a: number): number;
}
interface FuncB {
    (a: string): string;
}
let unionFunc: FuncA | FuncB;    //　どっちになるか分からない。
//unionFunc();    // 戻り値はユニオン型、パラメータはインターセクション型（never型になってしまうので何も入れれない）
unionFunc = function (a: string) { return 'hi' }


// ■Optional Chaining
interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}
const downloadedData: DownloadedData = {
    id: 1
}
console.log(downloadedData.user?.name?.first); //もしundefinedかnullだったらundefinedを返す。あるならnameを返す。あるならfirstを返す


// ■Nullish Coalescing
const userData = downloadedData.user ?? 'no-user'   //or演算子でもOK. 他との違いはundefined、nullだけ右側の文字になる。


// ■LookUp型
type id = DownloadedData["id" | "user"]


// ■型の互換性：https://typescript-jp.gitbook.io/deep-dive/type-system/type-compatibility
let target: string = 'hello'
let source: 'hello' = 'hello'
target = source;

// target3は少ないsource3多いのはOK
let target3 = function (a: string, b: string, c: string) { }   //どちらが正しい型として使われるか考えればわかる
let source3 = function (a: string) { }
target3 = source3;  //左が大きいのはダメというイメージ
target3('hi', 'hello', 'hello2')

// Class
class AdvancedPerson {
    name: string = 'Peter'
    // private age: number = 35;    // private、protectedが付いたのは、同じインスタンから出てきたものしかだめ
}
class AdvancedCar {
    name: string = 'Prius'
}
let target4 = new AdvancedPerson();
let source4 = new AdvancedCar();
target4 = source4;  //左が大きいのはダメというイメージ。

//number型にenum型は入れれる　互換性がある
enum Color {
    RED,
    BLUE
}
let target2 = Color.RED;
let source2 = 100;
target2 = source2;


// ■レストパラメーター（何個も入れれる）
// function advancedFn(...args: number[]) {}    //何個でも入れれるパターン
// function advancedFn(...args: [number, string, boolean]) {}   //タプルで書く
// function advancedFn(...args: [number, string, boolean?]) {} //オプショナルパラメータも付けれる（後ろからつけるように注意）
// function advancedFn(...args: [number, string, boolean, ...number[]]) {} //タプル追加もできる（ただし1つだけ、オプショナルパラメータも注意）
// advancedFn(0, 'hi', true, 3, 5, 9)

// function advancedFn(...args: readonly [number, string, boolean, ...number[]]) {} //readonlyもつけれる（pushとかはできなくなる）
function advancedFn(...args: readonly number[]) {} //これもいける


// ■constアサーション
let milk = 'milk' as const; //let じゃなくて constで書けば同じ型にはなる
let drink = milk;

const array1 = [10, 20];    //numberの配列から
const array2 = [10, 20] as const;   //タプル型になる。さらにreadonlyになる。型注釈しなくて良くなる

const peter = {
    name: 'Peter',
    age: 38
} as const;


// ■typeof
type PeterType = typeof peter;  //typeofを使えばpeterの「値の型」が取得できる！

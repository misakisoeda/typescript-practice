"use strict";
class Person {
    static isAdult(age) {
        if (age > 17)
            return true;
        return false;
    }
    //constructor(initName: string, initAge: number) { //予約語　初期化
    //constructor(public readonly name: string, private age: number) { //初期化が楽になる　readonly=>「どこでも」触れない。だが constructor の中では触れる。
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // private incrementAge() {    //classの外では触れないようにする
    incrementAge() {
        this.age += 1;
    }
    // greeting() {    //メソッドを追加してみる
    // greeting(this: { name: string }) {    //第１引数にthisを書く thisが使われていて、正しい情報をTSに教える
    greeting() {
        console.log(`Hello! My name is ${this.name} . I am ${this.age} years old.`);
    }
}
// public name: string;   //name フィールド（指定しなくてもデフォルトでpublic どこでも使える）
// private age: number;    //「classの外」では触れないようにする
// readonly id : number = 32;
// private readonly id : number = 32;
Person.species = 'Homo sapiens';
let person2;
const quill = new Person('Quill', 38);
quill.incrementAge();
quill.greeting();
// ▼thisの確認
// const anotherQuill = {  //テストのオブジェクト追加
//     name: 'anotherQuill',
//     greeting: quill.greeting //thisがこれになるのでundefinedになる（間接的なのでエラーを出ない）→L10のように書く
// }
// anotherQuill.greeting(); //メソッドを追加（オブジェクトの中にある関数）
// クラスは型になる
// クラスが作り出すインスタンスも同時に作っている
// ▼継承
class Teacher extends Person {
    get subject() {
        if (!this._subject) {
            throw new Error('There is no subject.');
        }
        return this._subject;
    }
    set subject(value) {
        if (!value) {
            throw new Error('There is no subject.');
        }
        this._subject = value;
    }
    constructor(name, age, _subject) {
        super(name, age);
        this._subject = _subject;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name} . I am ${this.age} years old. I teach ${this.subject}`); //ageはprivateのためエラーが出る
    }
}
const teacher = new Teacher('Quill2', 50, 'Math');
console.log(teacher.subject); //ゲッター
teacher.subject = 'Music'; //セッター
console.log(Person.species);

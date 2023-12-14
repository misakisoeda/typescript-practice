"use strict";
// デコレータ＝関数をデコレーションするもの
// 将来的にJSに実装される予定
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//　デコレータはパラメータを追加することが出来ない。エラーになる。だから下のデコレータファクトリを使う。
function Logging1(constructor) {
    console.log('Logging1...');
    console.log(constructor);
}
let User1 = class User1 {
    constructor() {
        this.name = 'Quill';
        console.log('User was created!');
    }
};
User1 = __decorate([
    Logging1 //デコレータは、インスタンスの生成ではなく、クラスの生成時に実行されていることがわかる。
], User1);
//↓↓↓
//↓↓↓
//↓↓↓
// デコレータファクトリ＝デコレータを返す関数を書く
function Logging(message) {
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
function Component(template, selector) {
    // return function (constructor: Function) {   // const instance = new constructor(32);　←コンストラクタ関数なのか、ただの関数なのか理解できていないので伝える必要がある
    // return function (constructor: { new(age: number): { name: string } }) {   // newができるコンストラクタ関数という意味になる ★ここのnewは予約後！！
    return function (constructor) {
        const mountedElement = document.querySelector(selector);
        const instance = new constructor(10, 'cad'); // ここで生成されるオブジェクトは予約後のnewの箇所に型を書く必要がある
        if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1').textContent = instance.name;
        }
    };
}
let User = class User {
    constructor() {
        this.name = 'Quill';
        console.log('User was created!');
    }
};
User = __decorate([
    Component('<h1>{{ name }}</h1>', '#app'),
    Logging('Logging User') //最後に()を付ける
], User);

abstract class Person { //継承のためだけのクラス 中にabstractがあるときは必ずabstractをつける(インスタンスを生成できなくなる = new Person()　ができない)

    // public name: string;   //name フィールド（指定しなくてもデフォルトでpublic どこでも使える）
    // private age: number;    //「classの外」では触れないようにする
    // readonly id : number = 32;
    // private readonly id : number = 32;
    static species = 'Homo sapiens';
    static isAdult(age: number) {
        if (age > 17) return true;
        return false;
    }

    //constructor(initName: string, initAge: number) { //予約語　初期化
    //constructor(public readonly name: string, private age: number) { //初期化が楽になる　readonly=>「どこでも」触れない。だが constructor の中では触れる。
    constructor(public readonly name: string, protected age: number) { //privateだと継承先で使えないので、protectedにする（readonlyは問題ない）
    }

    // private incrementAge() {    //classの外では触れないようにする
    incrementAge() {
        // Person.isAdult   //staticで作られたものはthisが使えないので、このように明記する
        this.age += 1;
    }

    // greeting() {    //メソッドを追加してみる
    // greeting(this: { name: string }) {    //第１引数にthisを書く thisが使われていて、正しい情報をTSに教える
    greeting(this: Person) {    //フィールドが増えても問題ない！安全性も高まる
        console.log(`Hello! My name is ${this.name} . I am ${this.age} years old.`)
        this.explainJob();
    }
    abstract explainJob(): void;    //継承先で必ず必要になる
}
// let person2: Person;

// const quill = new Person('Quill' , 38);
// quill.incrementAge();
// quill.greeting();

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
    private static instance: Teacher; //staticメソッドからstaticプロパティを呼び出す＆外部からアクセス制御

    explainJob() {
        console.log(`I am a teacher and I teach ${this.subject}`);
    }

    get subject(): string { //ゲッター使用してみる
        if (!this._subject) {
            throw new Error('There is no subject.')
        }
        return this._subject;
    }
    set subject(value) { //getと共存出来ないので、同じ名前が使える 同じ名前のゲッターがあると、同じ型が指定される（変更もできない）
        if (!value) {
            throw new Error('There is no subject.')
        }
        this._subject = value;
    }

    // constructor(name: string, age: number, private _subject: string) {
    private constructor(name: string, age: number, private _subject: string) {  //1つのインスタンスを生成できなくなる シングルトンパターン //インスタンスを作らなくても使えるstaticメソッドを使う
        super(name, age);
    }

    // greeting(this: Teacher) {    //上書き
    //     console.log(`Hello! My name is ${this.name} . I am ${this.age} years old. I teach ${this.subject}`) //ageはprivateのためエラーが出る
    // }

    static getInstance() {//←インスタンスを作らなくても使えるstaticメソッドを使う
        if (Teacher.instance) return Teacher.instance;
        Teacher.instance = new Teacher('Quill2', 50, 'Math');
        return Teacher.instance;
    }

}
// const teacher = new Teacher('Quill2', 50, 'Math');
// teacher.greeting(); //abstract

// console.log(teacher.subject);   //ゲッター
// teacher.subject = 'Music';  //セッター


// console.log(Person.species);
// console.log(Person.isAdult(38));


//シングルトンパターン
const teacher = Teacher.getInstance();
const teacher2 = Teacher.getInstance();
console.log(teacher, teacher2);

// type addFunc = (num1: number, num2: number) => number;
// ↑実はinterfaceでも書ける
interface addFunc {
    (num1: number, num2: number): number;   //★メソッド名を書かない！=>でも基本的にはtypeで書こう
}
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Nameable {
    readonly name?: string;  //public privateは存在しない（Typeも）implementsの方は継承しないので注意
    nickName?: string;
}
const nameable: Nameable = {
    name: 'Quill',
    nickName: 'Qui'
}

// interface Human {
interface Human extends Nameable {  //継承する、interfaceの場合は複数できる。typeだと書ける
    // name: string;    //上限によっては上書きされる
    age: number;
    // greeting: (message: string) => void;
    greeting(message: string): void;   //メソッドだけこのようにかける（関数は上記）
}
//interfaceはオブジェクトのみ
//オブジェクトというのが分かりやすい！1番のメリット
//ちなみにtypeは全部いける

const human: Human = {
    name: 'Quill',
    age: 38,
    greeting(message: string) {
        console.log(message);
    }
}

// Humanを満たすクラスを作るという意味
// extendsもできる。さらにimplementsはextendsと違って複数持って来れる
// staticメソッドに影響は与えられない
// ★Developerクラスが生成する、インスタンスが持っているオブジェクトの形を表している
class Developer implements Human {
    test?: string;   //←?を使うのでundefinedでもいい場合。初期化しなくてもいい（初期化されたらstring、されなかったらundefinedになる）
    constructor(public name: string, public age: number, public experience: number, public initName?: string) { //?のパラメータは最後につける
        if (initName) {
            this.test = initName
        }
    }
    // greeting(message: string = 'hello') {  //何もない場合はhelloになる デフォルトパラメータ
    greeting(message?: string) {
        if (message) {
            message.toUpperCase();
        }
        console.log(message);
    }
}

// Humanにはexperienceがないのにエラーにならない
// =TSはHumanのキーが全てあるのであれば、「new Developer('Quill', 38, 3)」や「tmpDeveloper」は多くてもよいとされている
// 構造的部分型という
const tmpDeveloper = {
    name: 'Quill',  //最初の代入はOK!
    age: 38,
    experience: 3,
    greeting(message: string) {
        console.log(message);
    }
}
// const user: Human = new Developer('Quill', 38, 3);
const user: Human = tmpDeveloper;


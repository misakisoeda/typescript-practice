// デコレータ＝関数をデコレーションするもの
// 将来的にJSに実装される予定


//　デコレータはパラメータを追加することが出来ない。エラーになる。だから下のデコレータファクトリを使う。
function Logging1(constructor: Function) {    // Function（一般的な関数という意味） 内蔵されているコンストラクタ関数 DataとかMathみたいな
    console.log('Logging1...');
    console.log(constructor);
}

@Logging1    //デコレータは、インスタンスの生成ではなく、クラスの生成時に実行されていることがわかる。
class User1 {
    name = 'Quill';
    constructor() {
        console.log('User was created!');
    }
}
//↓↓↓
//↓↓↓
//↓↓↓
// デコレータファクトリ＝デコレータを返す関数を書く
function Logging(message: string) {
    return function (constructor: Function) {    // 無名件数にする
        console.log(message);
        console.log(constructor);
    }
}
function Component(template: string, selector: string) {
    // return function (constructor: Function) {   // const instance = new constructor(32);　←コンストラクタ関数なのか、ただの関数なのか理解できていないので伝える必要がある
    // return function (constructor: { new(age: number): { name: string } }) {   // newができるコンストラクタ関数という意味になる ★ここのnewは予約後！！
    // return function (constructor: { new(...args: any[]): { name: string } }) {   // newの中にはなんでも入れるようにすると良い
    return function <T extends { new(...args: any[]): { name: string } }>(constructor: T) {   // 戻り値にクラスを指定して新しいクラスを作り出すために改良
        return class extends constructor { //無名クラス この時のconstructor=User    ★デコレータの戻り値をクラスにしてみる=新しいクラスに書き換える
            constructor(...args: any[]) {
                super(...args);    // class User の constructorを指す
                console.log('Component');
                const mountedElement = document.querySelector(selector);
                const instance = new constructor(10, 'cad'); // ここで生成されるオブジェクトは予約後のnewの箇所に型を書く必要がある
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1')!.textContent = instance.name;
                }
            }
        }
    }
}

@Component('<h1>{{ name }}</h1>', '#app')   // 書く順番も大切　★デコレータファクトリー（デコレーターを返す関数）は上から下に実行　★デコレータの実行順は下から上に実行される
@Logging('Logging User')   //最後に()を付ける
class User {
    name = 'Quill';
    constructor(public age: number) {
        console.log('User was created!');
    }
}
const user1 = new User(52);



// extends => 制約
function copy<T extends { name: string }, U extends keyof T>(value: T, key: U): T {    //<T, U, V, S>  //extendsは制約
    value[key]  //★valueのキーに対応している　→　U extends keyof T　→　Tオブジェクトの型のキー一覧（ユニオン型）
    return value;
}
// console.log(copy<{ name: string }, string> ({ name: 'Quill' }));    //function copy<T, U>(value: T): T {　の場合
// console.log(copy({ name: 'Quill' })); //Uは設定なくてもunknownになる

console.log(copy({ name: 'Quill', age: 38 }, 'age'));

// type K = keyof { name: string; age: number }    //keyof演算子はキーをユニオン型にする


// ■Class
class LightDatabase<T extends string | number | boolean> {
    private data: T[] = [];
    add(item: T) {
        this.data.push(item);
    }
    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());


// ■interface,type
interface TmpDatabase<T> {
    id: number;
    data: T[];
}
type TmpDatabase2<T> = {
    id: number;
    data: T[];
}
const tmpDatabase: TmpDatabase<number> = {
    id: 3,
    data: [32]
}


// ■Utillityタイプ
interface Todo {
    title: string;
    text: string;
}
type Todoable = Partial<Todo>;
type ReadTodo = Readonly<Todo>;

// Promise
const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
})
fetchData.then(data => {
    data.toUpperCase();
})

// Array
const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];

// デフォルトの型パラメータをつけれる
interface ResponseData<T = string> {
    data: T;
    status: number;
}
let tmp: ResponseData;


// ■MappedTypes 型のfor文
interface Vegetables {
    readonly Tomato: string;
    Pumpkin: string;
}
let tmp2: keyof Vegetables;
type MappedTypes = {
    // [P in keyof Vegetables]: P
    -readonly [P in keyof Vegetables]?: string  //readonly,?は全てに適応される -readonly readonlyが消える
}
// type MappedTypes<T> = { //←結構使われる
//     [P in keyof T]: string
// }


// ■Condifional Types 型のif文（三項演算子に近い）
// extends => 左が右に入れれるか
type ConditionalTypes = 'tomato' extends string ? number : boolean

// infer R => anyの様なもの。なんでもいいという意味
// 次に　infer　が推測される。
type ConditionalTypesInfer = { tomato: 'tomato' } extends { tomato: infer R } ? R : boolean;

// ('tomato' | 'pumpkin') => 分配される
// ('tomato') が先に代入できるか見られる、 次に('pumpkin')になる
type DistributiveConditionalTypes <T> = T extends 'tomato' ? number : boolean;
let tmp3: DistributiveConditionalTypes<'tomato' | 'pumpkin'>;

let tmp4: NonNullable<string | null>;
// let tmp5: ReturnType;

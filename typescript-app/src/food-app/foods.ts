// import { Foodsable } from "./interfaces.js";    // 1.デフォルト
// import { Foodsable as FoodListable } from "./interfaces.js";    // 2.名前を変えられる
import * as Interfaces from "./interfaces";    // 3.全部取得
import { Food } from "./food";

// export class Foods implements FoodListable {
export class Foods implements Interfaces.Foodsable { //名前付きエクスポート
    private static instance: Foods;
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    private _activeElements: HTMLDivElement[] = [];
    private _activeElementsScore: number[] = [];
    get activeElements() {
        this._activeElements = [];  // 初期化
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        })
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        })
        return this._activeElementsScore;
    }
    private constructor() {
        this.elements.forEach(element => {
            new Food(element);
        })
    }
    static getInstance() {
        if (!Foods.instance) {  // 1度しかインスタンスが生成されなくなる
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();

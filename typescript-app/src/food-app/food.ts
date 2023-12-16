import { Foodable } from "./interfaces.js";
import { Score } from "./score.js";

export class Food implements Foodable {
    constructor(public element: HTMLDivElement) {
        element.addEventListener('click', this.clickEventHandler.bind(this));   // .bind(this) とすることで、clickEventHandlerのthisが正しく動く
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active');  // コールバック関数の中にthisが使われているため正しいthisを指し示していない。
        const score = Score.getInstance();  // インスタンス生成
        score.render();
    }
}

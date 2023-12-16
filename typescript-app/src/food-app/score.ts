import Scoreable from "./interfaces";    // {}を使わない。さらに自由に書ける（defaultエクスポートだから）
import { Foods } from "./foods";

export class Score implements Scoreable {
    private static instance: Score; //
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }
    private constructor() {}
    static getInstance() {
        if (!Score.instance) {  // 1度しかインスタンスが生成されなくなる
            Score.instance = new Score();
        }
        return Score.instance;
    }
}

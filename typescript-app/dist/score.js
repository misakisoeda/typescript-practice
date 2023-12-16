import { Foods } from "./foods.js";
export class Score {
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector('.score__number').textContent = String(this.totalScore);
    }
    constructor() { }
    static getInstance() {
        if (!Score.instance) { // 1度しかインスタンスが生成されなくなる
            Score.instance = new Score();
        }
        return Score.instance;
    }
}

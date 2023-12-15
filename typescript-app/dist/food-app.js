"use strict";
class Score {
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
class Food {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', this.clickEventHandler.bind(this)); // .bind(this) とすることで、clickEventHandlerのthisが正しく動く
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active'); // コールバック関数の中にthisが使われているため正しいthisを指し示していない。
        const score = Score.getInstance(); // インスタンス生成
        score.render();
    }
}
class Foods {
    get activeElements() {
        this._activeElements = []; // 初期化
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    constructor() {
        this.elements = document.querySelectorAll('.food');
        this._activeElements = [];
        this._activeElementsScore = [];
        this.elements.forEach(element => {
            new Food(element);
        });
    }
    static getInstance() {
        if (!Foods.instance) { // 1度しかインスタンスが生成されなくなる
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();

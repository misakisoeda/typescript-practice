interface Scoreable {
    readonly totalScore: number;
    render(): void;
}
interface Foodable {
    element: HTMLDivElement;
    clickEventHandler(): void;
}
interface Foodsable {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementsScore: number[];
}

class Score implements Scoreable {
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
class Food implements Foodable {
    constructor(public element: HTMLDivElement) {
        element.addEventListener('click', this.clickEventHandler.bind(this));   // .bind(this) とすることで、clickEventHandlerのthisが正しく動く
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active');  // コールバック関数の中にthisが使われているため正しいthisを指し示していない。
        const score = Score.getInstance();  // インスタンス生成
        score.render();
    }
}
class Foods implements Foodsable {
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

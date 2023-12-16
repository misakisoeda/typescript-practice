export default interface Scoreable {    // defaultエクスポート（import側も変更する）
    readonly totalScore: number;
    render(): void;
}
export interface Foodable {
    element: HTMLDivElement;
    clickEventHandler(): void;
}
export interface Foodsable {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementsScore: number[];
}

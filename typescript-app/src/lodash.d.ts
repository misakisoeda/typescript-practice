declare module 'lodash' {
    export function shuffle<T>(arr: T[]): T[]
}

interface Lodash {
    shuffle<T>(arr: T[]): T[]
}
// ↓interface を使ってみる
// declare const _: {  // 今回、　_ はオブジェクト
//     shuffle<T>(arr: T[]): T[]
// }
// ↓interface を使ってみる
declare const _: Lodash

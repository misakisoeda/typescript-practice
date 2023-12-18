// ↓npmでインストールしたライブラリを使う
declare module 'lodash' {
    export function shuffle<T>(arr: T[]): T[]
}

// ↓interface を使ってみる
// interface Lodash {
//     shuffle<T>(arr: T[]): T[]
// }

// declare const _: {  // 今回、　_ はオブジェクト
//     shuffle<T>(arr: T[]): T[]
// }
// ↓interface を使ってみる
// declare const _: Lodash

// ↓namespaceを使う
declare namespace _ {
    function shuffle<T>(arr: T[]): T[]
}


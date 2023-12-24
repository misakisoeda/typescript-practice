import _ from 'lodash';    // 拡張できるようにする

// ↓npmでインストールしたライブラリを使う
// declare module 'lodash' {
//     export function shuffle<T>(arr: T[]): T[]
// }
// {} => 名前付きエクスポートを指している
// 拡張できるのは、名前付きエクスポートだけという意味 デフォルトexportでは、declare moduleという方法では拡張できない。
// declare moduleは、namespaceぽいということを覚えておく

// declare module の時は、中のexportがなくてOK（自動でつく）
declare module 'lodash' {   //namespaceの延長を書かないとエラーになる
    interface hello {}
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
// declare namespace _ {
//     function shuffle<T>(arr: T[]): T[]
// }


"use strict";
let hi = 'hi';
console.log(hi.toUpperCase());
function echo(message) {
    return message;
}
let nullableMessage = echo('hi');
// nullableMessage.toLocaleUpperCase;  //nullの可能性があるため使えない
// ↓ if文で解決
if (nullableMessage) {
    nullableMessage.toUpperCase();
}
// noImplicitReturns
// function echo2(message2: string): string | undefined {
//     if (message2) {
//         return message2;
//     }
// }
// 暗黙的なreturnを返しているためエラー（警告）になる
// ↓ returnを明示する
function echo2(message2) {
    if (message2) {
        return message2;
    }
    return;
}

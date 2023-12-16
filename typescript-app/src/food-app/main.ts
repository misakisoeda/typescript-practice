// importしても何回も実行されない。最初に1回実行されるだけ
// import { Foods } from "./foods.js";    // エクスポートしているクラスを書く  .ts じゃなくて　.jsで書く
import { Foods } from "./foods";    // webpackを使うときは、tsにする エラー解消のためにtsも消しておく

Foods.getInstance();

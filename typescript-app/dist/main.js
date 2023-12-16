// importしても何回も実行されない。最初に1回実行されるだけ
import { Foods } from "./foods.js"; // エクスポートしているクラスを書く  .ts じゃなくて　.jsで書く
Foods.getInstance();

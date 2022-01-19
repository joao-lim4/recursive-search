import { Data } from "./Data/MyData";
import { simpleSeach } from "./Search/SimpleSearch";
import { simpleSeachKeyValue } from "./Search/SimpleSearchKeyValue";

const DataConst = new Data();


// console.log(simpleSeach(DataConst.getDataArray, "1"));
console.log(simpleSeachKeyValue(DataConst.getDataArray, "1", "id"));
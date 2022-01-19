import { Data } from "./Data/MyData";
// import { simpleSeach } from "./Search/SimpleSearch";
// import { simpleSeachKeyValue } from "./Search/SimpleSearchKeyValue";
// import { simpleSeachOperator } from "./Search/SimpleSearchOperator";
import { simpleSearchSubObject } from "./Search/SimpleSearchSubObjetos";

const DataConst = new Data();


// console.log(simpleSeach(DataConst.getDataArray, "1"));
// console.log(simpleSeachKeyValue(DataConst.getDataArray, "1", "id"));
// console.log(simpleSeachOperator(DataConst.getDataArray, "30510-150", "LIKE", "cep"));
console.log(simpleSearchSubObject(DataConst.getDataSubObject, "2", "==", "id"));
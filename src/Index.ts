import { Data } from "./Data/MyData";
import { simpleSeach } from "./Search/SimpleSearch";

const DataConst = new Data();


console.log(simpleSeach(DataConst.getDataArray, "1"));

type operator = "LIKE" | "==";

function recursiveObject(data: object, keys: Array<string>, match: string, position: number, keysLength: number, operator: operator, key?: string): Object | undefined {
    if((keysLength - position) - 1 < 0) return undefined;

    const isKey: boolean = (key !== null ? true : false);

    const contentObjectReferenceKey = (() => key !== null ? String(data[key]) : String(data[keys[position]]))();
    
    switch(operator) {
        case "LIKE":
            console.log(contentObjectReferenceKey)
            if(contentObjectReferenceKey.toLocaleLowerCase().indexOf(match.toLocaleLowerCase()) !== -1) {
                return data;
            }
        case "==":
            if(contentObjectReferenceKey.toLocaleLowerCase() === match.toLocaleLowerCase()) {
                return data;
            }
    }

    if(isKey) return undefined;

    return recursiveObject(data, keys, match,position + 1, keysLength, operator, key);
}

function recursiveSearch(data: Array<Object>, position: number, lengthArray: number, match: string, operator: operator, result: Array<Object>, key?:string ) {
    if((lengthArray - position) - 1 < 0) return result;
    
    const objectKeys:Array<string> = Object.keys(data[position]);

    let dataSearchObject = recursiveObject(data[position], objectKeys, match, 0, objectKeys.length, operator, key);
    
    if(typeof dataSearchObject !== "undefined") result.push(dataSearchObject);

    return recursiveSearch(data, position + 1, lengthArray, match, operator,result, key);
}


/**
 * @name simpleSeachOperator
 * @description Busca recursiva em um array de dados buscando por um termo específico podendo passar um 
 * operador podendo especificar um key específica de um determinado objeto
 * @param data Object[]
 * @param match string
 * @param operator operator
 * @param key? string
 * @returns Array
 */
function simpleSeachOperator(data: Array<Object>, match: string, operator: operator, key?:string): Array<Object> {
    if(!data.length) return []; 

    const result = recursiveSearch(data, 0, data.length, match, operator, new Array(0), key);

    return result;
}

export { simpleSeachOperator }
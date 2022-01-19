
function recursiveObject(data: object, match: string, key: string, position: number, keysLength: number): Object | undefined {
    if((keysLength - position) - 1 < 0) return undefined;

    const contentObjectReferenceKey = String(data[key]);

    if(contentObjectReferenceKey.toLocaleLowerCase().includes(match.toLocaleLowerCase())) {
        return data;
    }

    return recursiveObject(data, match,key, position + 1, keysLength);
}

function recursiveSearch(data: Array<Object>, position: number, lengthArray: number, match: string, key: string, result: Array<Object> ) {
    if((lengthArray - position) - 1 < 0) return result;
    
    const objectKeys:Array<string> = Object.keys(data[position]);
    
    if(objectKeys.indexOf(key) === -1) return recursiveSearch(data, position + 1, lengthArray, match,key, result);

    let dataSearchObject = recursiveObject(data[position], match, key, 0, objectKeys.length);
    
    if(typeof dataSearchObject !== "undefined") result.push(dataSearchObject);

    return recursiveSearch(data, position + 1, lengthArray, match,key, result);
}

/**
 * @name simpleSeachKeyValue
 * @description Busca recursiva em um array de dados buscando por um termo específico e uma key especifica
 * @param data Object[]
 * @param match String
 * @param key String
 * @returns Object[]
 */
function simpleSeachKeyValue(data: Array<Object>, match: string, key: string): Array<Object> {
    if(!data.length) return []; 

    const result = recursiveSearch(data, 0, data.length, match, key, new Array(0));

    return result;
}

export { simpleSeachKeyValue }
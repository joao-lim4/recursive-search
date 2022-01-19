
function recursiveObject(data: object, keys: Array<string>, match: string, position: number, keysLength: number): Object | undefined {
    if((keysLength - position) - 1 < 0) return undefined;

    const contentObjectReferenceKey = String(data[keys[position]]);

    if(contentObjectReferenceKey.toLocaleLowerCase().includes(match.toLocaleLowerCase())) {
        return data;
    }

    return recursiveObject(data, keys, match,position + 1, keysLength);
}

function recursiveSearch(data: Array<Object>, position: number, lengthArray: number, match: string, result: Array<Object> ) {
    if((lengthArray - position) - 1 < 0) return result;
    
    const objectKeys:Array<string> = Object.keys(data[position]);

    let dataSearchObject = recursiveObject(data[position], objectKeys, match, 0, objectKeys.length);
    
    if(typeof dataSearchObject !== "undefined") result.push(dataSearchObject);

    return recursiveSearch(data, position + 1, lengthArray, match, result);
}

function simpleSeach(data: Array<Object>, match: string):null | Array<Object> {
    if(!data.length) return null; 

    const result = recursiveSearch(data, 0, data.length, match, new Array(0));

    return result;
}

export { simpleSeach }
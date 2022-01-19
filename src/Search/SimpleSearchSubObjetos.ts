
type operator = "LIKE" | "==";

interface ContentObject {
    isKey: boolean,
    content: any,
}

function getContentObject(data: object,keys: Array<string>,position: number, key?:string): ContentObject {
    if(typeof key === "undefined") return {isKey: false, content: data[keys[position]]};

    if(keys.indexOf(key) === -1) return {isKey: true, content: data[keys[position]]};

    return {isKey: true, content: data[key]};
}

function recursiveObject(data: object, keys: Array<string>, match: string, position: number, keysLength: number, operator: operator, key?: string): Object | undefined {
    if((keysLength - position) - 1 < 0) return undefined;

    const contentObjectReferenceKey = getContentObject(data, keys, position, key);
    
    if(typeof contentObjectReferenceKey.content === "object") {
        const subObjectKeys = Object.keys(contentObjectReferenceKey.content);
        
        const resultSubObject = recursiveObject(
            contentObjectReferenceKey.content,
            subObjectKeys,
            match,
            0,
            subObjectKeys.length,
            operator,
            key
        );
        
        if(typeof resultSubObject === "object") return data;
        if(contentObjectReferenceKey.isKey || typeof resultSubObject === "undefined") return undefined;
    }
    
    switch(operator) {
        case "LIKE":
            if(String(contentObjectReferenceKey.content).toLocaleLowerCase().indexOf(match.toLocaleLowerCase()) !== -1) {
                return data;
            }
        case "==":
            if(String(contentObjectReferenceKey.content).toLocaleLowerCase() === match.toLocaleLowerCase()) {
                return data;
            }
    }

    return recursiveObject(data, keys, match,position + 1, keysLength, operator, key);
}

function recursiveSearch(data: Array<Object>, position: number, lengthArray: number, match: string, operator: operator, result: Array<Object>, key?:string ) {
    if((lengthArray - position) - 1 < 0) return result;
 
    const objectKeys:Array<string> = Object.keys(data[position]);

    let dataSearchObject = recursiveObject(data[position], objectKeys, match, 0, objectKeys.length, operator, key);
    
    if(typeof dataSearchObject !== "undefined") result.push(dataSearchObject);

    return recursiveSearch(data, position + 1, lengthArray, match, operator,result, key);
}

function simpleSearchSubObject(data: Array<Object>, match: string, operator: operator, key?:string):null | Array<Object> {
    if(!data.length) return null; 

    const result = recursiveSearch(data, 0, data.length, match, operator, new Array(0), key);

    return result;
}

export { simpleSearchSubObject }
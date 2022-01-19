
type operator = "LIKE" | "==";

interface ContentObject {
    isKey: boolean,
    content: any,
}

function getContentObject(data: Object,keys: Array<string>,position: number, key?:string): ContentObject {
    if(typeof key === "undefined") return {isKey: false, content: data[keys[position]]};

    if(keys.indexOf(key) === -1) return {isKey: true, content: data[keys[position]]};

    return {isKey: true, content: data[key]};
}

function recursiveObject(data: Object, keys: Array<string>, match: string, position: number, keysLength: number, operator: operator, key?: string): Object | undefined {
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
 
    const ObjectKeys:Array<string> = Object.keys(data[position]);

    let dataSearchObject = recursiveObject(data[position], ObjectKeys, match, 0, ObjectKeys.length, operator, key);
    
    if(typeof dataSearchObject !== "undefined") result.push(dataSearchObject);

    return recursiveSearch(data, position + 1, lengthArray, match, operator,result, key);
}

/**
* @name simpleSearchSubObject
* @description Busca recursiva em um array de dados buscando por um termo específico podendo passar um 
* operador, se durante a pesquisa determinada key for um objeto ele ira buscar dentro desse objeto também
* se for passada uma key por parâmetro ele ira buscar direto por essa key
* @param data Object[]
* @param match string
* @param operator operator
* @param key? string
* @returns Array
*/
function simpleSearchSubObject(data: Array<Object>, match: string, operator: operator, key?:string): Array<Object> {
    if(!data.length) return []; 

    const result = recursiveSearch(data, 0, data.length, match, operator, new Array(0), key);

    return result;
}

export { simpleSearchSubObject }
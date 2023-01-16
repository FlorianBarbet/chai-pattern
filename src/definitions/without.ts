export function _without(source: Structure, target: Structure, jsonPattern: Structure) {
    const patternKeys = Object.keys(jsonPattern);
    const sumOfKeys = new Set([...Object.keys(source), ...Object.keys(target)]);
    sumOfKeys.forEach(key => {
        if(patternKeys.includes(key)){
            delete source[key];
            delete target[key];
            return;
        }
        const value = jsonPattern[key];
        if((typeof value).match("^(object|function)$")) {
            _without(source[key] as Structure, target[key] as Structure, jsonPattern[key] as Structure);
        }
    });
}

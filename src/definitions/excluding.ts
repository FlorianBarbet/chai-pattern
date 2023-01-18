export function _excluding(source: Structure, target: Structure, jsonPattern: Structure | string) {
    const patternKeys = Object.keys(jsonPattern);
    const sumOfKeys = new Set([...Object.keys(source), ...Object.keys(target)]);
    sumOfKeys.forEach(key => {
        const value = typeof jsonPattern === 'string' ? JSON.parse(jsonPattern)[key] : jsonPattern[key];
        const isObject = (typeof value).match("^(object|function)$");

        if(patternKeys.includes(key) && !isObject){
            delete source[key];
            delete target[key];
            return;
        }

        if(isObject) {
            _excluding(source[key] as Structure, target[key] as Structure, value as Structure);
        }
    });
}

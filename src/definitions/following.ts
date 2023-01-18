export function _following(source: Structure , target: Structure, jsonPattern: Structure) {

    const patternKeys = Object.keys(jsonPattern);
    const sumOfKeys = new Set([...Object.keys(source), ...Object.keys(target)]);
    sumOfKeys.forEach(key => {
        const value = jsonPattern[key];

        if(!patternKeys.includes(key)){
            delete source[key];
            delete target[key];
            return;
        }

        if((typeof value).match("^(object|function)$")) {
            _following(source[key] as Structure, target[key] as Structure, value as Structure);
        }
    });
}

import Structure = Chai.Structure;

type Filter = (keys: string[], key: string) => boolean;
export function _morph(source: Structure , target: Structure, jsonPattern: Structure, _filter: Filter) {
    const patternKeys = Object.keys(jsonPattern);
    const sumOfKeys = new Set([...Object.keys(source), ...Object.keys(target)]);
    sumOfKeys.forEach(key => {
        if(_filter(patternKeys, key)){
            delete source[key];
            delete target[key];
            return;
        }
        const value = jsonPattern[key];
        if((typeof value).match("^(object|function)$")) {
            _morph(source[key] as Structure, target[key] as Structure, value as Structure, _filter);
        }
    });
}

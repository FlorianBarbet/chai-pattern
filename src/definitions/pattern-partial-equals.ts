/*
* Partial equals doesn't check types
* You can choose to check array's ordering.
* */
function _partialEquals(source: Structure, target: Structure, jsonPattern: Structure, ordered = false){
    let hasFalse = false;
    Object.entries(jsonPattern).forEach(([key, type]) => {
        const sourceValue = source[key];
        const targetValue = target[key];
        if ( hasFalse || !sourceValue || !targetValue ) return;
        if (Array.isArray(sourceValue) !== Array.isArray(targetValue)) {
            hasFalse = true;
            return;
        }
        if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
            /*Array equality*/
            hasFalse = sourceValue.length !== targetValue.length
            if (!hasFalse) {
                const _arrayChecker = ordered ?
                    (s: Primitive[], t: Primitive[], i: number) => s[i]!==t[i] :
                    (s: Primitive[], t: Primitive[], i: number) => !t.includes(s[i])
                for (let i=0; i < sourceValue.length;i++) {
                    if ( hasFalse ) {
                        i = sourceValue.length; // quick leave
                        return;
                    }
                    if ( (typeof sourceValue[i]).match("^(object|function)$") ) {
                        hasFalse = !_partialEquals(sourceValue[i] as Structure, targetValue[i] as Structure, (type as Structure[])[0])
                        return;
                    }
                    hasFalse = _arrayChecker(sourceValue, targetValue, i);
                }
            }
            return;
        }
        if ( (typeof type).match("^(object|function)$") ){
            hasFalse = !_partialEquals(sourceValue as Structure, targetValue as Structure, type as Structure);
            return;
        }
        hasFalse = sourceValue !== targetValue;
    });

    return !hasFalse;
}

export function _strictEquals(source: Structure, target: Structure, jsonPattern: Structure, ordered = true ): boolean{
    let hasFalse = false;
    Object.entries(jsonPattern).forEach(([key, type]) => {
        const sourceValue = source[key] ?? null;
        const targetValue = target[key] ?? null;
        if ( hasFalse || sourceValue === null || targetValue === null ) {
            return;
        }
        if (Array.isArray(sourceValue) !== Array.isArray(targetValue)) {
            hasFalse = true;
            return;
        }
        if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
            /*Array equality*/
            if (!hasFalse) {
                hasFalse = sourceValue.length !== targetValue.length
                const _arrayChecker = ordered ?
                    (s: Primitive[], t: Primitive[], at: string, i: number) => s[i]!==t[i]  || typeof s[i] !== at || typeof t[i] !== at :
                    (s: Primitive[], t: Primitive[], at: string, i: number) => !t.includes(s[i])  || typeof s[i] !== at || typeof t[i] !== at
                for (let i=0; i < sourceValue.length;i++) {
                    const arrayType = (type as (Structure|Primitive)[])[0];
                    if ( hasFalse ) {
                        i = sourceValue.length; // quick leave
                        return;
                    }

                    if ( (typeof sourceValue[i]).match("^(object|function)$") ) {
                        hasFalse = !_strictEquals(sourceValue[i] as Structure, targetValue[i] as Structure, arrayType as Structure)
                        return;
                    }
                    hasFalse = _arrayChecker(sourceValue, targetValue, arrayType as string, i);
                }
            }
            return;
        }
        if ( (typeof type).match("^(object|function)$") ){
           hasFalse = !_strictEquals(sourceValue as Structure, targetValue as Structure, type as Structure);
           return;
        }

        hasFalse = sourceValue !== targetValue || typeof sourceValue !== type || typeof targetValue !== type;
    });

    return !hasFalse;
}

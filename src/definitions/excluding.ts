import { _morph } from "@definitions/pattern-morphism";

export function _excluding(source: Structure, target: Structure, jsonPattern: Structure) {
    _morph(source, target, jsonPattern, (patternKeys, key) => patternKeys.includes(key));
}

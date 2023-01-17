import { _morph } from "@definitions/pattern-morphism";

export function _following(source: Structure , target: Structure, jsonPattern: Structure) {
    _morph(source, target, jsonPattern, (patternKeys, key) => !patternKeys.includes(key));
}

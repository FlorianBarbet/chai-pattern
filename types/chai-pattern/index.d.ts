/// <reference types="chai" />
declare namespace Chai
{
    export interface Assertion
        extends PatternMode {}
    type Primitive = string | number | boolean | object | null | undefined;
    type Structure = {[name: string]: Primitive | Structure | Primitive[] | Structure[]};

    export interface PatternSubject {
        compare(target: Structure): void
    }

    export interface PatternMode {
        strictly: PatternAssertion
        partially: PatternAssertion
    }

    export interface PatternAssertion {
        following(pattern: Structure | string): PatternSubject
        excluding(pattern: Structure | string): PatternSubject
    }
}

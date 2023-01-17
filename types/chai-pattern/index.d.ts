/// <reference types="chai" />
declare namespace Chai
{
    export interface Assertion extends PatternSubject
    {

    }
    type Primitive = string | number | boolean | object | null | undefined;
    type Structure = {[name: string]: Primitive | Primitive[] | Structure};

    export interface PatternSubject {
        compare(target: Structure): PatternPerm
    }

    export interface PatternPerm {
        strictly: PatternDef
        partially: PatternDef
    }

    export interface PatternDef {
        following(pattern: Structure): Assertion
        excluding(pattern: Structure): Assertion
    }


}

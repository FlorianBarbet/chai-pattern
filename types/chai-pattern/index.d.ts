/// <reference types="chai" />
declare namespace Chai
{
    /* Make it less magical by providing a scheme to follow : {a:'1', b : { c: '1'}, d: ["banana", "toto", "element"]}*/
    /* try something like : expect(origin).following({a:'type', ...}).deep.equals(expected). */
    /* - .following({}) */
    /* - .without({})   */
    /* - chain: strictly (not with partial)  */
    /* - chain: partial  (not with strictly) */
    /* - */
    export interface Assertion
    {
        following(pattern: Structure): Assertion
        without(pattern: Structure): Assertion
    }
    type Primitive = string | number | boolean | object | null | undefined;
    type Structure = {[name: string]: Primitive | Primitive[] | Structure};
    export interface PatternPerm {
        strictly: Assertion
        partial: Assertion
    }
}

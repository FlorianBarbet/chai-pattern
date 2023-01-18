import ChaiStatic = Chai.ChaiStatic;
import ChaiUtils = Chai.ChaiUtils;
import Structure = Chai.Structure;
import { _excluding } from "@definitions/excluding";
import { _following } from "@definitions/following";
import { AssertionError } from "chai";

type PatternMorphSig = (s: Structure, t: Structure, p: Structure) => void;
const _methodRegistry: {[methodName: string]: PatternMorphSig} = {};
_methodRegistry["_following"] = _following;
_methodRegistry["_excluding"] = _excluding;
type PatternEqualitySig = (s: Structure, t: Structure, p: Structure, o?: boolean) => boolean;
const _modeRegistry:{[methodName: string]: PatternEqualitySig} = {};
_methodRegistry["strictly"] = _strictEquals;
_methodRegistry["partially"] = _partialEquals;

/*TODO tests equals mode and add a way to indicate if ordering in array is desired*/

export const pattern = (_chai: ChaiStatic, utils: ChaiUtils): void => {
       /* Assert ! */
        _chai.Assertion.addMethod("compare", (_target: Structure) => {
                const target = structuredClone(_target);
                const source: Structure = utils.flag(this, "source");
                const pattern: Structure = utils.flag(this, "pattern");
                const mode: string = utils.flag(this, "mode");
                const method: string = utils.flag(this, "method");

                _methodRegistry[method](source, target, pattern);
                const validation = _modeRegistry[mode](source, target, pattern);
                // @ts-ignore
                this.assert(validation,
                    `expected #{this} to be equals with #{exp} ${method.substr(1)} this pattern ${mode.substr(1)} : ${JSON.stringify(pattern)}`,
                    `expected #{this} to be equals with #{exp} ${method.substr(1)} this pattern ${mode.substr(1)} : ${JSON.stringify(pattern)}`,
                    source,
                    target,
                    _chai.config.showDiff);
        });
        /* Mode */
        ['strictly', 'partially'].forEach(modeFlag => {
                _chai.Assertion.addProperty(modeFlag, () => {
                        utils.flag(this, "source", structuredClone(utils.flag(this,"object")));
                        const mode = utils.flag(this, "mode");
                        if(mode && mode !== modeFlag){
                            throw new AssertionError(`You've just set '${modeFlag}' mode, but mode is already set as '${mode}'.`);
                        }
                        utils.flag(this, "mode", modeFlag);
                });
        });
        /* Pattern morphism methods */
        _chai.Assertion.addChainableMethod("following", (pattern: Structure | string) => {
                utils.flag(this, "pattern", typeof pattern === 'string' ? JSON.parse(pattern) : pattern);
                utils.flag(this, "method", "_following");
        });
        _chai.Assertion.addChainableMethod("excluding", (pattern: Structure | string) => {
                utils.flag(this, "pattern", typeof pattern === 'string' ? JSON.parse(pattern) : pattern);
                utils.flag(this, "method", "_excluding");
        });
};

import ChaiStatic = Chai.ChaiStatic;
import ChaiUtils = Chai.ChaiUtils;
import { _excluding } from "@definitions/excluding";
import { _following } from "@definitions/following";
import { AssertionError } from "chai";
import Structure = Chai.Structure;

export const pattern = (_chai: ChaiStatic, utils: ChaiUtils): void => {
        /*TODO : tests and implements strict and partial effects*/
        ['strictly', 'partially'].forEach(modeFlag => {
                _chai.Assertion.addProperty(modeFlag, () => {
                        utils.flag(this, "source", utils.flag(this,"object"));
                        const mode = utils.flag(this, "mode");
                        if(mode && mode !== modeFlag){
                                throw new AssertionError(`You've just set '${modeFlag}' mode, but mode is already set as '${mode}'.`);
                        }
                        utils.flag(this, "mode", modeFlag);
                });
        })

        _chai.Assertion.addChainableMethod("following", (pattern: Structure) => {
                const source: Structure = utils.flag(this, "source");
                const target: Structure = utils.flag(this, "target");
                _following(source, target, pattern);
        });
        _chai.Assertion.addChainableMethod("excluding", (pattern: Structure) => {
                const source: Structure = utils.flag(this, "source");
                const target: Structure = utils.flag(this, "target");
                _excluding(source, target, pattern);
        });
        _chai.Assertion.addChainableMethod("compare", (target: Structure) => {
                utils.flag(this, "target", target);
        });
};

import ChaiStatic = Chai.ChaiStatic;
import ChaiUtils = Chai.ChaiUtils;
import { _without } from "@definitions/without";
import { _following } from "@definitions/following";
import { AssertionError } from "chai";

export const pattern = (_chai: ChaiStatic, utils: ChaiUtils): void => {
        /*TODO : tests and implements strict and partial effects*/
        ['strict', 'partial'].forEach(modeFlag => {
                _chai.Assertion.addProperty(modeFlag, () => {
                        utils.flag(this, "source", utils.flag(this,"object"));
                        const mode = utils.flag(this, "mode");
                        if(mode && mode !== modeFlag){
                                throw new AssertionError(`You've just set '${modeFlag}' mode, but mode is already set as '${mode}'.`);
                        }
                        utils.flag(this, "mode", modeFlag);
                });
        })

        _chai.Assertion.addChainableMethod("following", pattern => {
                const source = utils.flag(this, "source");
                const target = utils.flag(this, "target");
                _following(source, target, pattern);
        });
        _chai.Assertion.addChainableMethod("without", pattern => {
                const source = utils.flag(this, "source");
                const target = utils.flag(this, "target");
                _without(source, target, pattern);
        });
};

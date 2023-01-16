import ChaiStatic = Chai.ChaiStatic;
import ChaiUtils = Chai.ChaiUtils;
import { _without } from "@definitions/without";
import { _following } from "@definitions/following";
import { AssertionError } from "chai";

export const pattern = (_chai: ChaiStatic, utils: ChaiUtils): void => {
        /*TODO : tests and implements properties strict and partial*/
        _chai.Assertion.addProperty("strictly", () => {
                utils.flag(this, "source", utils.flag(this,"object"));
                if(utils.flag(this, "mode") !== "strict"){
                        throw new AssertionError("You choose 'strict' mode, but mode is already set.");
                }
                utils.flag(this, "mode", "strict");
        });
        _chai.Assertion.addChainableMethod("partial", () => {
                utils.flag(this, "source", utils.flag(this,"object"));
                if(utils.flag(this, "mode") !== "partial"){
                        throw new AssertionError("You choose 'partial' mode, but mode is already set.");
                }
                utils.flag(this, "mode", "partial");
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

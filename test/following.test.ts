import { expect } from "chai";
import { _following } from "@definitions/following";

describe("FollowingPattern", () => {
     it("should remove keys that not following 'pattern' field", () => {
        const source = {p1: "", p2: "", p3: ""};
        const target = {p1:"", p3:"", p4: ""};
        const pattern = {p1:"", p3:""};

        _following(source, target, pattern);

        expect(source).to.have.property("p1");
        expect(source).to.have.property("p3");
        expect(source).not.to.have.property("p2");

        expect(target).to.have.property("p1");
        expect(target).to.have.property("p3");
        expect(target).not.to.have.property("p4");
     });
});

import * as chai from 'chai';
import { pattern } from "../../src";
import source from './sources-sample.json' ;
import target from './targets-sample.json';
import { expect } from "chai";
chai.use(pattern);

describe('use-case', () => {
    describe('following', () => {
         it('should check union of structure A and B (strict type check mode)', () => {
                const pattern = {
                    firstCase: {
                        index: 'number'
                    }
                };
               expect(source).strictly.following(pattern).compare(target);
         });

        it('should NOT check union of structure A and B (strict type check mode)', () => {
            const pattern = {
                firstCase: {
                    index: 'string'
                }
            };
            expect(source).not.strictly.following(pattern).compare(target);
        });

        it('should check union of structure A and B (partial value only mode)', () => {
            const pattern = {
                firstCase: {
                    index: 'string'
                }
            };
            expect(source).partially.following(pattern).compare(target);
        });
   });
});

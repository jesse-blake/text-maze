'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: shuffle array:', function() {

        const sa = utils.shuffleArray;
        const array = [1,2,3,4,5];

        it('should not change the array contents', function() {
            sa(array);
            expect(array).to.have.members([1,2,3,4,5]);
            expect(array.length).to.equal(5);
        });

        it('should change the ordering of elements, but luck will make this fail once in a while', function() {
            expect(array).to.not.have.ordered.members([1,2,3,4,5]);
        });
    });
};

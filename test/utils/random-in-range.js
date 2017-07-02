'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: random in range:', function() {

        const rir = utils.randomInRange;

        it('should bound by its domain [min, max]', function() {
            for (let i = 0; i < 100; i++) {
                expect(rir(0, 2)).to.be.within(0, 2);
            }
        });

        it('should allow negative domain values', function() {
            for (let i = 0; i < 100; i++) {
                expect(rir(-5, 5)).to.be.within(-5, 5);
            }
        });

        it('should work with small domains', function() {
            for (let i = 0; i < 5; i++) {
                expect(rir(43, 43)).to.equal(43);
            }
        });
    });
};

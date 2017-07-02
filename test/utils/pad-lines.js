'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: pad lines:', function() {

        const pl = utils.padLines;

        it('should add no padding', function() {
            expect(pl(['foo'], 13)).to.deep.equal(['foo']);
        });

        it('should, again, add no padding', function() {
            expect(pl(['foo'], 14)).to.deep.equal(['foo']);
        });

        it('should add one space for padding', function() {
            expect(pl(['foo'], 15)).to.deep.equal(['foo ']);
        });

        it('should, again, add one space for padding', function() {
            expect(pl(['foo'], 16)).to.deep.equal(['foo ']);
        });

        it('should, add two spaces for padding', function() {
            expect(pl(['foo'], 17)).to.deep.equal(['foo  ']);
        });

        it('should, add padding to all lines', function() {
            // watch out for length of individual characters here: 'f' is shorter in maze than 'b'.
            expect(pl(['foo', 'bar', 'b'], 17)).to.deep.equal(['foo  ', 'bar ', 'b     ']);
        });
    });
};

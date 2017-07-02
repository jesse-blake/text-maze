'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: break text into lines:', function() {

        const btil = utils.breakTextIntoLines;

        it('"foo" should fit on one line', function() {
            expect(btil('foo', 13)).to.deep.equal(['foo']);
        });

        it('"foo" should not fit on one line', function() {
            expect(btil('foo', 12)).to.not.deep.equal(['foo']);
        });

        it('"foo" should hyphenate', function() {
            expect(btil('foo', 12)).to.deep.equal(['f-', 'oo']);
        });

        it('"foobar" should hyphenate', function() {
            expect(btil('foobar', 26)).to.deep.equal(['fooba-', 'r']);
        });

        it('"foo bar" should fit on one line', function() {
            expect(btil('foo bar', 29)).to.deep.equal(['foo bar']);
        });

        it('"foo bar" should not fit on one line', function() {
            expect(btil('foo bar', 28)).to.not.deep.equal(['foo bar']);
        });

        it('"foobarbaz" should hyphenate to three lines', function() {
            expect(btil('foobarbaz', 19)).to.deep.equal(['foo-', 'bar-', 'baz']);
        });

        it('should throw an error when maze is not wide enough for hyphenation', function() {
            expect(() => { btil('foobarbaz', 9); }).to.throw(Error, 'Hyphenation failed');
        });

        it('should not throw an error when maze is wide enough for hyphenation', function() {
            expect(() => { btil('foobarbaz', 10); }).to.not.throw(Error, 'Hyphenation failed');
        });
    });
};

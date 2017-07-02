'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: Char:', function() {

        const C = utils.Char;

        it('should init', function() {
            const c = Object.create(C);

            c.init('f', 0, 0);
            expect(c.ch).to.equal('f');
            expect(c.topLeftX).to.equal(0);
            expect(c.topLeftY).to.equal(0);
            expect(c.connected).to.be.false;
            expect(c.spaceCharConnectionArray).to.be.null;
            expect(Object.getOwnPropertyNames(c)).to.deep.equal(['ch', 'topLeftX', 'topLeftY', 'connected', 'spaceCharConnectionArray']);

            c.init('1', 4, 3); // Jesus
            expect(c.ch).to.equal('1');
            expect(c.topLeftX).to.equal(4);
            expect(c.topLeftY).to.equal(3);
            expect(c.connected).to.be.false;
            expect(c.spaceCharConnectionArray).to.be.null;
            expect(Object.getOwnPropertyNames(c)).to.deep.equal(['ch', 'topLeftX', 'topLeftY', 'connected', 'spaceCharConnectionArray']);
        });

        it('should init blank', function() {
            const c = Object.create(C);

            c.initBlank();
            expect(c.ch).to.be.null;
            expect(c.topLeftX).to.be.null;
            expect(c.topLeftY).to.be.null;
            expect(c.connected).to.be.false;
            expect(c.spaceCharConnectionArray).to.be.null;
            expect(Object.getOwnPropertyNames(c)).to.deep.equal(['ch', 'topLeftX', 'topLeftY', 'connected', 'spaceCharConnectionArray']);
        });

        it('should fail to init with invalid args', function() {
            const c = Object.create(C);

            expect(() => { c.init('', 0, 0) }).to.throw(Error, 'Invalid arg "ch"');
            expect(() => { c.init('foo', 0, 0) }).to.throw(Error, 'Invalid arg "ch"');
            expect(() => { c.init(43, 0, 0) }).to.throw(Error, 'Invalid arg "ch"');
            expect(() => { c.init('f', -1, 0) }).to.throw(Error, 'Invalid arg "topLeftX"');
            expect(() => { c.init('f', 'o', 0) }).to.throw(Error, 'Invalid arg "topLeftX"');
            expect(() => { c.init('f', 0, -1) }).to.throw(Error, 'Invalid arg "topLeftY"');
            expect(() => { c.init('f', 0, 'o') }).to.throw(Error, 'Invalid arg "topLeftY"');
        });

        it('should fail to init blank with args', function() {
            const c = Object.create(C);

            expect(() => { c.initBlank('foo') }).to.throw(Error, 'takes no args');
        });

        it('should flatten correctly', function() {
            const c = Object.create(C);

            c.initBlank();
            expect(c.flatten()).to.equal(0);

            c.connected = true;
            expect(c.flatten()).to.equal(1);

            c.init(' ', 5, 1); // Spaces cannot start at 1, 1 because the original text is trimmed.
            c.spaceCharConnectionArray = [0, 0, 1, 0, 0];
            expect(c.flatten(5, 1)).to.equal(0);
            expect(c.flatten(5, 2)).to.equal(0);
            expect(c.flatten(5, 3)).to.equal(1);
            expect(c.flatten(5, 4)).to.equal(0);
            expect(c.flatten(5, 5)).to.equal(0);

            c.init('!', 1, 1);
            expect(c.flatten(1, 1)).to.equal(2);
            expect(c.flatten(1, 2)).to.equal(2);
            expect(c.flatten(1, 3)).to.equal(2);
            expect(c.flatten(1, 4)).to.equal(1);
            expect(c.flatten(1, 5)).to.equal(2);

            c.init('?', 1, 1);
            expect(c.flatten(2, 2)).to.equal(0);
            expect(c.flatten(2, 4)).to.equal(1); // The ?'s blank spot.
            expect(c.flatten(2, 5)).to.equal(2);

            c.init('f', 1, 1);
            expect(c.flatten(1, 1)).to.equal(2);
            expect(c.flatten(1, 2)).to.equal(2);
            expect(c.flatten(1, 3)).to.equal(2);
            expect(c.flatten(1, 4)).to.equal(2);
            expect(c.flatten(1, 5)).to.equal(2);
            expect(c.flatten(2, 1)).to.equal(2);
            expect(c.flatten(2, 2)).to.equal(0);
            expect(c.flatten(2, 3)).to.equal(2);
            expect(c.flatten(2, 4)).to.equal(0);
            expect(c.flatten(2, 5)).to.equal(0);
            expect(c.flatten(3, 1)).to.equal(2);
            expect(c.flatten(3, 2)).to.equal(0);
            expect(c.flatten(3, 3)).to.equal(2);
            expect(c.flatten(3, 4)).to.equal(0);
            expect(c.flatten(3, 5)).to.equal(0);
        });
    });
};

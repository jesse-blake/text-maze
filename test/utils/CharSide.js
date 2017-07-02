'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: CharSide:', function() {

        const CS = utils.CharSide;

        it('should init' , function() {
            const cs   = Object.create(CS);
            const mock = { ch: 'a', topLeftX: 1, topLeftY: 1, connected: true };

            cs.init(mock, 'top');
            expect(cs.ofChar).to.equal(mock);
            expect(cs.whichSide).to.equal('top');
        });

        it('should fail to init with invalid args' , function() {
            const cs   = Object.create(CS);
            const mock = { topLeftX: 1, topLeftY: 1, connected: true };

            expect(() => { cs.init(mock, 'top') }).to.throw(Error, 'Arg "ofChar" doesn\'t');

            mock.ch = 'a';
            expect(() => { cs.init(mock, 'foo') }).to.throw(Error, 'must be either');
        });

        it('should get name of opposite side' , function() {
            const cs   = Object.create(CS);
            const mock = { ch: 'a', topLeftX: 1, topLeftY: 1, connected: true };

            cs.init(mock, 'top');
            expect(cs.getNameOfOppositeSide()).to.equal('bottom');
        });
    });
};

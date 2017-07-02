'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: char maps:', function() {

        const cm = utils.charMaps;

        it('should clean the text', function() {

            // Ignore whitelisted characters.
            expect(cm.cleanText('0123456789')).to.equal('0123456789');
            expect(cm.cleanText('abcdefghijklmnopqrstuvwxyz')).to.equal('abcdefghijklmnopqrstuvwxyz');
            expect(cm.cleanText('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).to.equal('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            expect(cm.cleanText('. ? ! \'')).to.equal('. ? ! \'');

            // Remove non-whitelisted characters.
            expect(cm.cleanText('~`@f#$%\n\t^&*()o_-+=/":;[]{}|o\\')).to.equal('foo');

            // Reduce contiguous spaces to one space (newlines, tabs, etc will already be removed).
            expect(cm.cleanText('f   o   o')).to.equal('f o o');

            // Trim whitespace.
            expect(cm.cleanText(' foo ')).to.equal('foo');
        });

        it('should say char height is 5', function() {
            expect(cm.getCharHeight()).to.equal(5);
        });

        it('should return the correct char width', function() {
            expect(cm.getLengthOfCharInMaze('f')).to.equal(3);
            expect(cm.getLengthOfCharInMaze('o')).to.equal(3);
            expect(cm.getLengthOfCharInMaze('m')).to.equal(5);
            expect(cm.getLengthOfCharInMaze('b')).to.equal(4);
            expect(cm.getLengthOfCharInMaze('a')).to.equal(3);
            expect(cm.getLengthOfCharInMaze('r')).to.equal(4);
        });

        it('should return the correct char row', function() {
            expect(cm.getRowOfChar('r', 0)).to.deep.equal([1,1,1,0]);
            expect(cm.getRowOfChar('r', 1)).to.deep.equal([1,0,1,0]);
            expect(cm.getRowOfChar('r', 2)).to.deep.equal([1,1,1,0]);
            expect(cm.getRowOfChar('r', 3)).to.deep.equal([1,0,1,1]);
            expect(cm.getRowOfChar('r', 4)).to.deep.equal([1,0,0,1]);
        });

        it('should return the correct char bit', function() {
            expect(cm.getBitAtCellInChar('4', 0, 0)).to.equal(1);
            expect(cm.getBitAtCellInChar('4', 2, 0)).to.equal(1);
            expect(cm.getBitAtCellInChar('4', 0, 4)).to.equal(0);
            expect(cm.getBitAtCellInChar('4', 2, 4)).to.equal(1);

            expect(cm.getBitAtCellInChar('!', 0, 0)).to.equal(1);
            expect(cm.getBitAtCellInChar('!', 0, 2)).to.equal(1);
            expect(cm.getBitAtCellInChar('!', 0, 3)).to.equal(0);
            expect(cm.getBitAtCellInChar('!', 0, 4)).to.equal(1);
        });

        it('should return the correct char connection options', function() {
            expect(cm.getConnectionOptsForSideOfChar(' ', 'top')).to.deep.equal([1]);
            expect(cm.getConnectionOptsForSideOfChar(' ', 'bottom')).to.deep.equal([1]);
            expect(cm.getConnectionOptsForSideOfChar(' ', 'right')).to.deep.equal([1,1,1,1,1]);
            expect(cm.getConnectionOptsForSideOfChar(' ', 'left')).to.deep.equal([1,1,1,1,1]);

            expect(cm.getConnectionOptsForSideOfChar('4', 'top')).to.deep.equal([1,0,1]);
            expect(cm.getConnectionOptsForSideOfChar('4', 'bottom')).to.deep.equal([0,0,1]);
            expect(cm.getConnectionOptsForSideOfChar('4', 'right')).to.deep.equal([1,1,1,1,1]);
            expect(cm.getConnectionOptsForSideOfChar('4', 'left')).to.deep.equal([1,1,1,0,0]);

            expect(cm.getConnectionOptsForSideOfChar('\'', 'top')).to.deep.equal([1]);
            expect(cm.getConnectionOptsForSideOfChar('\'', 'bottom')).to.deep.equal([0]);
            expect(cm.getConnectionOptsForSideOfChar('\'', 'right')).to.deep.equal([1,1,0,0,0]);
            expect(cm.getConnectionOptsForSideOfChar('\'', 'left')).to.deep.equal([1,1,0,0,0]);
        });
    });
};

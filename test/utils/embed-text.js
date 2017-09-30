'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: embed text:', function() {

        const et = utils.embedText;

        it('should have 7 rows', function() {
            var result = et(['foo'], 13);

            expect(result.maze.length).to.equal(7);
        });

        it('should have 13 cells in each row', function() {
            var result = et(['foo'], 13);

            for (var i = 0; i < 7; i++) {
                expect(result.maze[i].length).to.equal(13);
            }
        });

        it('should have the correct Char references in each cell', function() {
            var result = et(['foo'], 13);

            for (var i = 0; i < 13; i++) {
                expect(result.maze[0][i].ch).to.be.null;
                expect(result.maze[6][i].ch).to.be.null;
            }

            for (i = 0; i < 13; i++) {
                if (i == 0 || i == 4 || i == 8 || i == 12) {
                    expect(result.maze[1][i].ch).to.be.null;
                } else if (i >= 1 && i <= 3) {
                    expect(result.maze[1][i].ch).to.equal('f');
                } else {
                    expect(result.maze[1][i].ch).to.equal('o');
                }
            }
        });

        it('should have 19 rows', function() {
            var result = et(['foo  ', 'bar ', 'b     '], 17);

            expect(result.maze.length).to.equal(19);
        });

        it('should have 17 cells in each row', function() {
            var result = et(['foo  ', 'bar ', 'b     '], 17);

            for (var i = 0; i < 19; i++) {
                expect(result.maze[i].length).to.equal(17);
            }
        });

        it('should also have the correct Char references in its cells', function() {
            var result = et(['foo  ', 'bar ', 'b     '], 17);

            // Blank rows in maze, and borders.
            for (var i = 0; i < 17; i++) {
                expect(result.maze[0][i].ch).to.be.null;
                expect(result.maze[6][i].ch).to.be.null;
                expect(result.maze[12][i].ch).to.be.null;
                expect(result.maze[18][i].ch).to.be.null;
            }

            // Rows that are part of lines of text.
            for (i = 0; i < 17; i++) {

                if ([0, 4, 8, 12, 14, 16].indexOf(i) >= 0) {
                    expect(result.maze[1][i].ch).to.be.null;
                } else if (i >= 1 && i <= 3) {
                    expect(result.maze[1][i].ch).to.equal('f');
                } else if (i >= 5 && i <= 7 || i >= 9 && i <= 11) {
                    expect(result.maze[1][i].ch).to.equal('o');
                } else {
                    expect(result.maze[1][i].ch).to.equal(' ');
                }

                if ([0, 5, 9, 14, 16].indexOf(i) >= 0) {
                    expect(result.maze[7][i].ch).to.be.null;
                } else if (i >= 1 && i <= 4) {
                    expect(result.maze[7][i].ch).to.equal('b');
                } else if (i >= 6 && i <= 8) {
                    expect(result.maze[7][i].ch).to.equal('a');
                } else if (i >= 10 && i <= 13) {
                    expect(result.maze[7][i].ch).to.equal('r');
                } else {
                    expect(result.maze[7][i].ch).to.equal(' ');
                }

                if ([0, 5, 7, 9, 11, 13, 15, 16].indexOf(i) >= 0) {
                    expect(result.maze[13][i].ch).to.be.null;
                } else if (i >= 1 && i <= 4) {
                    expect(result.maze[13][i].ch).to.equal('b');
                } else {
                    expect(result.maze[13][i].ch).to.equal(' ');
                }
            }
        });
    });
};

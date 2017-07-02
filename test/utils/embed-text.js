'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: embed text:', function() {

        const et = utils.embedText;

        it('should have 7 rows', function() {
            var [maze, charlist] = et(['foo'], 13);

            expect(maze.length).to.equal(7);
        });

        it('should have 13 cells in each row', function() {
            var [maze, charlist] = et(['foo'], 13);

            for (var i = 0; i < 7; i++) {
                expect(maze[i].length).to.equal(13);
            }
        });

        it('should have the correct Char references in each cell', function() {
            var [maze, charlist] = et(['foo'], 13);

            for (var i = 0; i < 13; i++) {
                expect(maze[0][i].ch).to.be.null;
                expect(maze[6][i].ch).to.be.null;
            }

            for (i = 0; i < 13; i++) {
                if (i == 0 || i == 4 || i == 8 || i == 12) {
                    expect(maze[1][i].ch).to.be.null;
                } else if (i >= 1 && i <= 3) {
                    expect(maze[1][i].ch).to.equal('f');
                } else {
                    expect(maze[1][i].ch).to.equal('o');
                }
            }
        });

        it('should have 19 rows', function() {
            var [maze, charlist] = et(['foo  ', 'bar ', 'b     '], 17);

            expect(maze.length).to.equal(19);
        });

        it('should have 17 cells in each row', function() {
            var [maze, charlist] = et(['foo  ', 'bar ', 'b     '], 17);

            for (var i = 0; i < 19; i++) {
                expect(maze[i].length).to.equal(17);
            }
        });

        it('should also have the correct Char references in its cells', function() {
            var [maze, charlist] = et(['foo  ', 'bar ', 'b     '], 17);

            // Blank rows in maze, and borders.
            for (var i = 0; i < 17; i++) {
                expect(maze[0][i].ch).to.be.null;
                expect(maze[6][i].ch).to.be.null;
                expect(maze[12][i].ch).to.be.null;
                expect(maze[18][i].ch).to.be.null;
            }

            // Rows that are part of lines of text.
            for (i = 0; i < 17; i++) {

                if ([0, 4, 8, 12, 14, 16].indexOf(i) >= 0) {
                    expect(maze[1][i].ch).to.be.null;
                } else if (i >= 1 && i <= 3) {
                    expect(maze[1][i].ch).to.equal('f');
                } else if (i >= 5 && i <= 7 || i >= 9 && i <= 11) {
                    expect(maze[1][i].ch).to.equal('o');
                } else {
                    expect(maze[1][i].ch).to.equal(' ');
                }

                if ([0, 5, 9, 14, 16].indexOf(i) >= 0) {
                    expect(maze[7][i].ch).to.be.null;
                } else if (i >= 1 && i <= 4) {
                    expect(maze[7][i].ch).to.equal('b');
                } else if (i >= 6 && i <= 8) {
                    expect(maze[7][i].ch).to.equal('a');
                } else if (i >= 10 && i <= 13) {
                    expect(maze[7][i].ch).to.equal('r');
                } else {
                    expect(maze[7][i].ch).to.equal(' ');
                }

                if ([0, 5, 7, 9, 11, 13, 15, 16].indexOf(i) >= 0) {
                    expect(maze[13][i].ch).to.be.null;
                } else if (i >= 1 && i <= 4) {
                    expect(maze[13][i].ch).to.equal('b');
                } else {
                    expect(maze[13][i].ch).to.equal(' ');
                }
            }
        });
    });
};

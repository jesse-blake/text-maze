'use strict';

const expect = require('chai').expect;
const utils  = require('../../lib/utils');

module.exports = function() {
    describe('maze util: connect chars horizontally:', function() {

        const cch = utils.connectCharsHorizontally;

        utils.charWhitelist().split('').forEach(function(ch1) {
            it('should connect '+ch1+' to any char horizontally left to right', function() {
                utils.charWhitelist().split('').forEach(function(ch2) {

                    // Connect from right to left.
                    let [maze, charlist] = utils.embedText([ch1 + ch2], 20); // 20 is more width than needed, but not testing embed-text.

                    let side = Object.create(utils.CharSide)
                    side.init(charlist[0], 'right'); // Right.

                    charlist[0].connected = true; // Hard code first maze connection, as the normal alg does.

                    cch(maze, side, charlist[1]);

                    // Both Chars should now be connected.
                    expect(charlist[0].connected).to.be.true;
                    expect(charlist[1].connected).to.be.true;

                    // Test column of cells between the connected chars:
                    // 1. The Char object in each cell should be a blank, so its 'ch' property should be null.
                    // 2. And, there should be at least one connection, so adding up the connection booleans of the cells should be > 1.

                    expect(maze[1][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[2][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[3][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[4][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[5][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;

                    expect(maze[1][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[2][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[3][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[4][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[5][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected > 0);
                });
            });
        });

        utils.charWhitelist().split('').forEach(function(ch1) {
            it('should connect '+ch1+' to any char horizontally right to left', function() {
                utils.charWhitelist().split('').forEach(function(ch2) {

                    // Connect from left to right.
                    let [maze, charlist] = utils.embedText([ch1 + ch2], 100); // 20 is more width than needed, but not testing embed-text.

                    let side = Object.create(utils.CharSide)
                    side.init(charlist[1], 'left'); // Left.

                    charlist[1].connected = true; // Hard code first maze connection, as the normal alg does.

                    cch(maze, side, charlist[0]);

                    // Both Chars should now be connected.
                    expect(charlist[0].connected).to.be.true;
                    expect(charlist[1].connected).to.be.true;

                    // Test column of cells between the connected chars:
                    // 1. The Char object in each cell should be a blank, so its 'ch' property should be null.
                    // 2. And, there should be at least one connection, so adding up the connection booleans of the cells should be > 1.

                    expect(maze[1][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[2][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[3][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[4][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;
                    expect(maze[5][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].ch).to.be.null;

                    expect(maze[1][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[2][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[3][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[4][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected +
                           maze[5][charlist[0].topLeftX + utils.charMaps.getLengthOfCharInMaze(charlist[0].ch)].connected > 0);
                });
            });
        });
    });
};

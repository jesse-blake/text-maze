'use strict';

var utils = require('./index');

// Builds the maze by connecting the embedded characters.
module.exports = function(maze, charlist) {

    // Sides of Chars to be connected.
    var side, sidelist = [];

    // A Char adjacent to a given Side.
    var adjChar;

    // Start connecting from a random Char.
    var startCharIdx = utils.randomInRange(0, charlist.length-1);

    // Connect the first Char.
    charlist[startCharIdx].connected = true;

    // Add the first Char's sides to the side list.
    addSidesOfCharToSidelist(charlist[startCharIdx], sidelist);

    while (sidelist.length) {
        utils.shuffleArray(sidelist);

        side = sidelist.pop();

        // TODO Fix what the following comment speaks of.
        // Sometimes an adjacent Char won't be found when looking above or below.
        adjChar = utils.findAdjacentChar(maze, side);

        // Try to connect the side to the adjacent Char.
        if (adjChar && !adjChar.connected) {
            if (side.whichSide === 'left' || side.whichSide === 'right') {
                utils.connectCharsHorizontally(maze, side, adjChar);
            }
            else {
                utils.connectCharsVertically(maze, side, adjChar);
            }

            // TODO (Again,) fix what the following comment speaks of .
            // Sometimes a vertical connection won't be made; in that case don't
            // add the sides of the unconnnected adjacent Char.
            if (adjChar.connected) {
                addSidesOfCharToSidelist(adjChar, sidelist);
            }
        }
    }

    return maze;
};

// Create and push four Side objects, one for each side of 'character', onto the 'sidelist'.
function addSidesOfCharToSidelist(charObj, sidelist) {
    var i, s, sides = ['top', 'right', 'bottom', 'left'];

    for (i = 0; i < sides.length; i++) {
        s = Object.create(utils.CharSide);
        s.init(charObj, sides[i]);

        sidelist.push(s);
    }
}

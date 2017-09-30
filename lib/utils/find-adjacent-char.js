'use strict';

var utils = require('./index');

// Returns a Char adjacent to the given side of a Char, or null if
// the side has no adjacent Char
module.exports = function(maze, side) {

    // Coordinates of a Char in the maze
    var x = -1, y = -1;

    // Find coordinates of a Char adjacent to this Side
    switch (side.whichSide) {

    case 'top':
        y = side.ofChar.topLeftY - 2;
        x = getXCoordForRandomAdjacentChar(maze, side.ofChar, y);
        break;

    case 'right':
        y = side.ofChar.topLeftY;
        x = side.ofChar.topLeftX + utils.charMaps.getLengthOfCharInMaze(side.ofChar.ch) + 1;
        break;

    case 'bottom':
        y = side.ofChar.topLeftY + utils.charMaps.getCharHeight() + 1;
        x = getXCoordForRandomAdjacentChar(maze, side.ofChar, y);
        break;

    case 'left':
        y = side.ofChar.topLeftY;
        x = side.ofChar.topLeftX - 2;
        break;

    default:
        throw new Error('Invalid side');
    }

    return isValidCharLoc(maze, x, y) ? maze[y][x] : null;
};

// Collect all x coordinates for Char into an array
function getXCoordsOfChar(ch) {
    var i, xCoords = [];

    var charLen = utils.charMaps.getLengthOfCharInMaze(ch.ch);

    for (i = ch.topLeftX; i < ch.topLeftX + charLen; i++) {
        xCoords.push(i);
    }

    return xCoords;
}

// Returns true if the coordinates refer to a Char object in the maze
function isValidCharLoc(maze, x, y) {
    return y >= 0 &&
           x >= 0 &&
           y < maze.length &&
           x < maze[y].length &&
           typeof maze[y][x] === 'object' &&
           'ch' in maze[y][x] &&
           maze[y][x].ch !== null;
}

// A helper for finding Chars above or below another Char in the maze
// Returns the x coord of a Char on the given row y that has x coordinates
// overlapping those of the given character
function getXCoordForRandomAdjacentChar(maze, character, y) {
    var i;

    // A shuffled list of all possible x coordinates for the adjacent Char
    var xCoords = getXCoordsOfChar(character);

    // Shuffle the possible x coordinates
    utils.shuffleArray(xCoords);

    // Return the first x coordinate that refers to a Char object
    for (i = 0; i < xCoords.length; i++) {
        if (isValidCharLoc(maze, xCoords[i], y)) {
            return xCoords[i];
        }
    }

    // No adjacent Char objects found
    return null;
}

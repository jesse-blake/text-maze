'use strict';

var utils     = require('../../utilities');
var mazeChars = require('../maze-characters');

// Returns a Character adjacent to the given side of a Character, or null if
// the side has no adjacent Character
// TODO Get all Characters adjacent to top or bottom; there could be more than just one
module.exports = function(maze, side) {

    // Collect all x coordinates for Character into an array
    function getXCoordsOfChar(ch) {
        var i, xCoords = [];

        var charLen = mazeChars.getLengthOfCharInMaze(ch.ch);

        for (i = ch.topLeftX; i < ch.topLeftX + charLen; i++) {
            xCoords.push(i);
        }

        return xCoords;
    }

    // Returns true if the coordinates refer to a Character object in the maze
    function isValidCharacterLoc(maze, x, y) {
        return y >= 0 &&
               x >= 0 &&
               y < maze.length &&
               x < maze[y].length &&
               typeof maze[y][x] === 'object' &&
               'ch' in maze[y][x];
    }

    // A helper for finding Characters above or below another Character in the maze
    // Returns the x coord of a Character on the given row y that has x coordinates 
    // overlapping those of the given character
    // TODO Use a generator when using ES6 features
    function getXCoordForRandomAdjacentChar(maze, character, y) {
        var i;
        
        // A shuffled list of all possible x coordinates for the adjacent Character
        var xCoords = getXCoordsOfChar(character);

        // Shuffle the possible x coordinates
        utils.shuffleArrayInPlace(xCoords);

        // Return the first x coordinate that refers to a Character object
        for (i = 0; i < xCoords.length; i++) {
            if (isValidCharacterLoc(maze, xCoords[i], y)) {
                return xCoords[i];
            }
        }

        // No adjacent Character objects found
        return null;
    }

    var i;

    // Coordinates of a Character in the maze
    var x = -1, y = -1;

    // Find coordinates of a Character adjacent to this Side
    switch (side.whichSide) {

        case 'top': 
            y = side.ofChar.topLeftY - 2;
            x = getXCoordForRandomAdjacentChar(maze, side.ofChar, y);
            break;

        case 'right': 
            y = side.ofChar.topLeftY;
            x = side.ofChar.topLeftX + mazeChars.getLengthOfCharInMaze(side.ofChar.ch) + 1;
            break;

        case 'bottom': 
            y = side.ofChar.topLeftY + mazeChars.getCharHeight() + 1;
            x = getXCoordForRandomAdjacentChar(maze, side.ofChar, y);
            break;

        case 'left': 
            y = side.ofChar.topLeftY;
            x = side.ofChar.topLeftX - 2;
            break;

        default:
            throw new Error('Invalid side');
    }

    return isValidCharacterLoc(maze, x, y) ? maze[y][x] : null;
};

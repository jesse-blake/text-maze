'use strict';

var utils     = require('../utils');
var mazeChars = require('./maze-characters');

module.exports = function(maze, charlist) {

    function addSidesOfCharToSidelist(character, sidelist) {
        var i, s, sides = ['top', 'right', 'bottom', 'left'];

        // An object to represent one of a character's four sides
        var Side = {
            init: function(ofChar, whichSide) {

                // A reference to the Character object this Side belongs to
                this.ofChar = ofChar;

                // One of: top right bottom left
                this.whichSide = whichSide;
            }
        };

        // Create and push four Sides on to the side list
        for (i = 0; i < sides.length; i++) {
            s = Object.create(Side);
            s.init(character, sides[i]);

            sidelist.push(s);
        }
    }

    // Returns a Character adjacent to the given side of a Character, or null if
    // the side has no adjacent Character
    // TODO Get all Characters adjacent to top or bottom; there could be more than just one
    function getCharacterAdjacentToSide(maze, side) {

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
            var xCoords = [];

            // Length of the given Character
            var charLen = mazeChars.getLengthOfCharInMaze(character.ch);

            // Collect all possible x coordinates for an adjacent Character into an array
            for (i = character.topLeftX; i < character.topLeftX + charLen; i++) {
                xCoords.push(i);
            }

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
        }

        return isValidCharacterLoc(maze, x, y) ? maze[y][x] : null;
    }

    // Sides of Characters to be connected
    var side, sidelist = []; 

    // A Character adjacent to a given Side
    var adjChar;

    // Add the first Character's sides to the side list
    charlist[0].connected = true;
    addSidesOfCharToSidelist(charlist[0], sidelist);

    while (sidelist.length) {
        utils.shuffleArrayInPlace(sidelist);

        side = sidelist.pop();

        adjChar = getCharacterAdjacentToSide(maze, side);

        if (adjChar && !adjChar.connected) {
            adjChar.connected = true;
            addSidesOfCharToSidelist(adjChar, sidelist);
        }
    }

    return;
};

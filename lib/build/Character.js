'use strict';

var utils    = require('../utils');
var CharMaps = require('./CharacterMaps');

// Maze locations corresponding to the same embeded character hold
// references to an object representing that character. This is the
// prototype for those character objects.
module.exports = {

    init: function(ch, topLeftX, topLeftY) {

        // The ascii character this object represents.
        this.ch = ch; 

        // The top left coordinates of this character in the maze.
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;

        // True if this character itself has been connected in the maze yet.
        this.connected = utils.unconnected;

        this.spaceCharConnectionArray = null;
    },

    // Return the color for the location in the maze corresponding to the 
    // given coordinates.
    getColor: function(x, y) {

        // Convert the maze indices to indices into the character's map.
        x = x - this.topLeftX;
        y = y - this.topLeftY;

        if (x >= 0 && 
            y >= 0 &&
            x < CharMaps.getLengthOfCharInMaze(this.ch) &&
            y < CharMaps.getCharHeight(this.ch)) {

            // Special case: use a space Character's connection array to
            // find the color.
            if (this.ch === ' ') {
                return this.spaceCharConnectionArray[y] ? utils.colors.connectedLight : utils.colors.unconnected;
            }

            // Special case: connect the blank space in an exclamation point
            // as a path in the maze.
            else if (this.ch === '!' && y === 3) {
                return utils.colors.connectedLight;
            }

            return CharMaps.getBitAtLocationInChar(this.ch, x, y) === utils.connected ? utils.colors.connectedDark : utils.colors.unconnected;
        }

        throw new Error('Invalid location for the given character.');
    }
};

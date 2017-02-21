'use strict';

var utils    = require('../utils');
var CharMaps = require('./CharacterMaps');

// The locations in the maze that together compose a single embedded
// character are represented by a single Character instance. Each location
// in the maze that isn't part of an embedded character is represented
// by its own Character instance created with the initBlank function.
module.exports = {

    // Init a blank/non character.
    initBlank: function() {
        this.ch                       = null;
        this.topLeftX                 = null;
        this.topLeftY                 = null;
        this.connected                = utils.no;
        this.spaceCharConnectionArray = null;
    },

    // Init a normal character.
    init: function(ch, topLeftX, topLeftY) {

        if (arguments.length != 3) {
            throw new Error('Invalid number of arguments to Character init function');
        }

        // An ascii character.
        this.ch = ch;

        // Coordinates of the top left location in the maze for this Character.
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;

        // Set to 'yes' when this Character becomes connected as a path in the maze.
        this.connected = utils.no;

        // Indicates which location in a space Character are connected as a path in the maze.
        this.spaceCharConnectionArray = null;
    },

    // Return the color for the location in the maze corresponding to the 
    // given coordinates.
    getColor: function(x, y) {
        var color = null;

        if (this.ch === null) {
            color = this.connected ? utils.colors.connectedLight : utils.colors.unconnected;
        }

        else {

            // Convert the maze indices to indices into the character's map.
            x = x - this.topLeftX;
            y = y - this.topLeftY;

            if (x >= 0 && 
                y >= 0 &&
                x < CharMaps.getLengthOfCharInMaze(this.ch) &&
                y < CharMaps.getCharHeight(this.ch)) {

                if (this.ch === ' ') {
                    color = this.spaceCharConnectionArray[y] ? utils.colors.connectedLight : utils.colors.unconnected;
                }
                else if (this.ch === '!' && y === 3) {
                    color = utils.colors.connectedLight;
                }
                else {
                    color =  CharMaps.getBitAtLocationInChar(this.ch, x, y) === utils.yes ? utils.colors.connectedDark : utils.colors.unconnected;
                }
            }
        }

        if (color) {
            return color;
        }

        throw new Error('Invalid location for the given character.');
    }
};

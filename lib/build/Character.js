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

    // Used to flatten/simplify a location in the maze for easier rendering and use.
    flattenCharacter: function(x, y) {

        var flattened = {
            // Pre-set a few properties for the solver module.
            visited: utils.no,
            flag: utils.no
        };

        // Convert the maze indices to indices into the character's map.
        x = x - this.topLeftX;
        y = y - this.topLeftY;

        // Adds the properties 'path' and 'connection' to flattened.
        // Note: connection is meaningless unless path == 1.
        // If path == 0:                    location is not a path in the maze.
        // If path == 1:                    location is     a path in the maze.
        // If path == 1 && connection == 0: location is     a character.
        // If path == 1 && connection == 1: location is not a character.
        switch (true) {

            // Blank/non character:
            case this.ch === null:
                flattened.path = this.connected ? utils.yes : utils.no;
                flattened.connection = this.connected ? utils.yes : utils.no;
                break;

            // Space character: use its special connection array.
            case this.ch === ' ':
                flattened.path = this.spaceCharConnectionArray[y] ? utils.yes : utils.no;
                flattened.connection = this.spaceCharConnectionArray[y] ? utils.yes : utils.no;
                break;

            // Exclamation point blank spot: make it a connection.
            case this.ch === '!' && x === 0 && y === 3:
                flattened.path = utils.yes;
                flattened.connection = utils.yes;
                break;

            // Any other character.
            default:
                flattened.path = CharMaps.getBitAtLocationInChar(this.ch, x, y);
                flattened.connection = utils.no;
        }

        return flattened;
    }
};

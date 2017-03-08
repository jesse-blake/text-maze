'use strict';

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
        this.connected                = false;
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
        this.connected = false;

        // Indicates which location in a space Character are connected as a path in the maze.
        this.spaceCharConnectionArray = null;
    },

    // Used to flatten/simplify a location in the maze for easier rendering and use.
    flattenCharacter: function(x, y, colors) {

        var flattened = {
            // A maze location visited while searching for the solution.
            visited: false,
            // A maze location on the maze's solution path.
            solution: false,
            // The location's current color.
            color: colors.unvisited
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
                flattened.path = this.connected ? true : false;
                flattened.connection = this.connected ? true : false;
                break;

            // Space character: use its special connection array.
            case this.ch === ' ':
                flattened.path = this.spaceCharConnectionArray[y] ? true : false;
                flattened.connection = this.spaceCharConnectionArray[y] ? true : false;
                break;

            // Exclamation point blank spot: make it a connection.
            case this.ch === '!' && x === 0 && y === 3:
                flattened.path = true;
                flattened.connection = true;
                break;

            // Any other character.
            default:
                flattened.path = CharMaps.getBitAtLocationInChar(this.ch, x, y);
                flattened.connection = false;
        }

        return flattened;
    }
};

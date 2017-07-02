'use strict';

var utils = require('./index');

// The cells in the maze that together compose a single embedded
// character are represented by a single Char instance (init).
//
// Each cell in the maze that isn't part of an embedded character is
// represented by its own blank Char instance (initBlank).
module.exports = {

    // Init a normal Char.
    init: function(ch, topLeftX, topLeftY) {

        if (typeof ch != 'string' || ch.length != 1) {
            throw new Error('Invalid arg "ch": (' + ch + ')');
        }

        if (typeof topLeftX != 'number' || topLeftX % 1 !== 0 || topLeftX < 0) {
            throw new Error('Invalid arg "topLeftX": (' + topLeftX + ')');
        }

        if (typeof topLeftY != 'number' || topLeftY % 1 !== 0 || topLeftY < 0) {
            throw new Error('Invalid arg "topLeftY": (' + topLeftY + ')');
        }

        // An ascii character.
        this.ch = ch;

        // Coordinates of the top left cell in the maze for this Character.
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;

        // Set to 'yes' when this Char becomes connected as a path in the maze.
        this.connected = false;

        // Indicates which cell in a space Char are connected as a path in the maze.
        this.spaceCharConnectionArray = null;
    },

    // Init a blank Char.
    initBlank: function() {

        if (arguments.length) throw new Error('Char:initBlank takes no args.');

        this.ch                       = null;
        this.topLeftX                 = null;
        this.topLeftY                 = null;
        this.connected                = false;
        this.spaceCharConnectionArray = null;
    },

    // Boil the character down to a single number.
    // @param x: One of the maze indices in which this Char is embedded; expected to be undefined if this is a blank Char.
    // @param y: One of the maze indices in which this Char is embedded; expected to be undefined if this is a blank Char.
    flatten: function(x, y) {

        const BLANK     = 0; // Neither a path nor a character.
        const PATH      = 1; // A path, but not a character.
        const CHARACTER = 2; // Both a path and character.

        // Blank/non character:
        if (this.ch === null) return this.connected ? PATH : BLANK;

        // Convert the maze indices to indices into the character's map.
        x = x - this.topLeftX;
        y = y - this.topLeftY;

        // Space character: use its special connection array.
        if (this.ch === ' ') return this.spaceCharConnectionArray[y] ? PATH : BLANK;

        // Exclamation point blank spot: make it a connection.
        if (this.ch === '!' && x === 0 && y === 3) return PATH;

        // Question mark blank spot: mike it a conneciton.
        if (this.ch === '?' && x === 1 && y === 3) return PATH;

        // Any other character.
        return utils.charMaps.getBitAtCellInChar(this.ch, x, y) ? CHARACTER : BLANK;
    }
};

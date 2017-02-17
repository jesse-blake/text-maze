'use strict';

module.exports = {

    // Clean the text that is to be rendered in the maze
    cleanText: function(text) {
        return text
            .replace(/(^\s+|\s+$)/g, '')       // Trim whitespace
            .replace(/[^A-Za-z0-9 .?!']/g, '') // Remove blacklisted characters
            .replace(/\s+/g, ' ');             // Reduce contiguous whitespace to a single space
    },

    // Return the height of a character's bitmap, which is the height (in
    // maze locations) the character will require in the maze
    getCharHeight: function() {
        return this._A.map.length;
    },

    // Return the length of a row in a character's bitmap, which is the length
    // (in maze locations) the character will require in the maze
    getLengthOfCharInMaze: function(ch) {
        return this._getChar(ch)[0].length;
    },

    // Return a copy of a row of a character's bitmap
    getRowOfChar: function(ch, idx) {
        return this._getChar(ch)[idx].slice();
    },

    // Returns the bit in a character at the given coordinates
    getBitAtLocationInChar: function(ch, x, y) {
        return this._getChar(ch)[y][x]; 
    },

    // Return a bitmap array that indicates where the maze can be connected to
    // a character on a particular side of that character
    //
    // @param ch: The character in ascii
    // @param side: One of: top right bottom left
    getConnectionOptsForSideOfChar: function(ch, side) {
        var i, bitmap, charMap = this._getChar(ch);

        switch (side) {

            // Return the top row in the character's bitmap
            case 'top':
                return charMap[0].slice();

            // Return an array with the values at the end of each row in the character
            case 'right':
                bitmap = [];
                for (i = 0; i < this.getCharHeight(); i++) {
                    bitmap.push(charMap[i][charMap[i].length - 1]);
                }
                return bitmap;

            // Return the bottom row in the character bitmap
            case 'bottom':
                return charMap[this.getCharHeight() - 1].slice();

            // Return an array with the values at the end of each row in the character
            case 'left':
                bitmap = [];
                for (i = 0; i < this.getCharHeight(); i++) {
                    bitmap.push(charMap[i][0]);
                }
                return bitmap;
            default:
                throw new Error("Param 'side' requires one of: top right bottom left");
        }
    },

    // Internal function to get a character's bitmap
    _getChar: function(ch) {
        switch (ch) {
            case ' ':
                return this._Space.map;
            case '.':
                return this._Period.map;
            case '?':
                return this._Question.map;
            case '!':
                return this._Exclamation.map;
            case "'":
                return this._Apostrophe.map;
            case '-':
                return this._Hyphen.map;
        }

        return this['_' + ch.toUpperCase()].map;
    },

    _A: {
        map: [
          [1,1,1],
          [1,0,1],
          [1,1,1],
          [1,0,1],
          [1,0,1]
        ],
    },
    _B: {
        map: [
          [1,1,1,0],
          [1,0,1,0],
          [1,1,1,1],
          [1,0,0,1],
          [1,1,1,1]
        ],
    },
    _C: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,0,0],
          [1,0,0],
          [1,1,1]
        ],
    },
    _D: {
        map: [
          [1,1,1,0],
          [1,0,1,1],
          [1,0,0,1],
          [1,0,1,1],
          [1,1,1,0]
        ],
    },
    _E: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,1,1],
          [1,0,0],
          [1,1,1]
        ],
    },
    _F: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,1,1],
          [1,0,0],
          [1,0,0]
        ],
    },
    _G: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,0,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _H: {
        map: [
          [1,0,1],
          [1,0,1],
          [1,1,1],
          [1,0,1],
          [1,0,1]
        ],
    },
    _I: {
        map: [
          [1,1,1],
          [0,1,0],
          [0,1,0],
          [0,1,0],
          [1,1,1]
        ],
    },
    _J: {
        map: [
          [0,0,1],
          [0,0,1],
          [0,0,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _K: {
        map: [
          [1,0,0,1],
          [1,0,1,1],
          [1,1,1,0],
          [1,0,1,1],
          [1,0,0,1]
        ],
    },
    _L: {
        map: [
          [1,0,0],
          [1,0,0],
          [1,0,0],
          [1,0,0],
          [1,1,1]
        ],
    },
    _M: {
        map: [
          [1,1,1,1,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1]
        ],
    },
    _N: {
        map: [
          [1,1,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,1,1]
        ],
    },
    _O: {
        map: [
          [1,1,1],
          [1,0,1],
          [1,0,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _P: {
        map: [
          [1,1,1],
          [1,0,1],
          [1,1,1],
          [1,0,0],
          [1,0,0]
        ],
    },
    _Q: {
        map: [
          [1,1,1,0],
          [1,0,1,0],
          [1,0,1,0],
          [1,0,1,0],
          [1,1,1,1]
        ],
    },
    _R: {
        map: [
          [1,1,1,0],
          [1,0,1,0],
          [1,1,1,0],
          [1,0,1,1],
          [1,0,0,1]
        ],
    },
    _S: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,1,1],
          [0,0,1],
          [1,1,1]
        ],
    },
    _T: {
        map: [
          [1,1,1],
          [0,1,0],
          [0,1,0],
          [0,1,0],
          [0,1,0]
        ],
    },
    _U: {
        map: [
          [1,0,1],
          [1,0,1],
          [1,0,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _V: {
        map: [
          [1,0,1],
          [1,0,1],
          [1,0,1],
          [1,1,1],
          [0,1,0]
        ],
    },
    _W: {
        map: [
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,1,1,1,1]
        ],
    },
    _X: {
        map: [
          [1,0,1],
          [1,1,1],
          [0,1,0],
          [1,1,1],
          [1,0,1]
        ],
    },
    _Y: {
        map: [
          [1,0,1],
          [1,0,1],
          [1,1,1],
          [0,0,1],
          [1,1,1]
        ],
    },
    _Z: {
        map: [
          [1,1,1,1],
          [0,0,1,0],
          [0,1,1,0],
          [0,1,0,0],
          [1,1,1,1]
        ],
    },
    _0: {
        map: [
          [1,1,1],
          [1,0,1],
          [1,0,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _1: {
        map: [
          [0,1,0],
          [1,1,0],
          [0,1,0],
          [0,1,0],
          [1,1,1]
        ],
    },
    _2: {
        map: [
          [1,1,1],
          [0,0,1],
          [1,1,1],
          [1,0,0],
          [1,1,1]
        ],
    },
    _3: {
        map: [
          [1,1,1],
          [0,0,1],
          [1,1,1],
          [0,0,1],
          [1,1,1]
        ],
    },
    _4: {
        map: [
          [1,0,1],
          [1,0,1],
          [1,1,1],
          [0,0,1],
          [0,0,1]
        ],
    },
    _5: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,1,0],
          [0,1,1],
          [1,1,0]
        ],
    },
    _6: {
        map: [
          [1,1,1],
          [1,0,0],
          [1,1,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _7: {
        map: [
          [1,1,1],
          [0,0,1],
          [0,0,1],
          [0,0,1],
          [0,0,1]
        ],
    },
    _8: {
        map: [
          [1,1,1],
          [1,0,1],
          [1,1,1],
          [1,0,1],
          [1,1,1]
        ],
    },
    _9: {
        map: [
          [1,1,1],
          [1,0,1],
          [1,1,1],
          [0,0,1],
          [0,0,1]
        ],
    },
    _Space: {
        map: [
          [0],
          [0],
          [0],
          [0],
          [0]
        ],
    },
    _Period: {
        map: [
          [0],
          [0],
          [0],
          [0],
          [1]
        ],
    },
    _Question: {
        map: [
          [1,1,1],
          [0,0,1],
          [0,1,1],
          [0,0,0],
          [0,1,0]
        ],
    },
    _Exclamation: {
        map: [
          [1],
          [1],
          [1],
          [0],
          [1]
        ],
    },
    _Apostrophe: {
        map: [
          [1],
          [1],
          [0],
          [0],
          [0]
        ],
    },
    _Hyphen: {
        map: [
          [0,0],
          [0,0],
          [1,1],
          [0,0],
          [0,0]
        ]
    },
};

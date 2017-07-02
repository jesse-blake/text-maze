'use strict';

// An object to represent one of a Char's four sides: for every Char added as a
// path in the maze, four CharSide objects are added to a list; a list that is shuffled
// to randomly select the next path to connect in the maze.
module.exports = {

    init: function(ofChar, whichSide) {

        // A reference to the Char object this Side belongs to.
        this.ofChar = ofChar;

        // One of: top, right, bottom, left.
        this.whichSide = whichSide;
    },

    getNameOfOppositeSide: function() {

        var lookupTable = {
            'top': 'bottom',
            'right': 'left',
            'bottom': 'top',
            'left': 'right'
        };

        return lookupTable[this.whichSide];
    }
};

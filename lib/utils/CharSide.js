'use strict';

// An object to represent one of a Char's four sides: for every Char added as a
// path in the maze, four CharSide objects are added to a list; a list that is shuffled
// to randomly select the next path to connect in the maze.
module.exports = {

    init: function(ofChar, whichSide) {

        if (!('ch' in ofChar) || !('topLeftX' in ofChar) || !('topLeftY' in ofChar) || !('connected' in ofChar)) {
            throw new Error('Arg "ofChar" doesn\'t look like it delegates to Char.js');
        }

        // A reference to the Char object this Side belongs to.
        this.ofChar = ofChar;

        if (['top', 'bottom', 'left', 'right'].indexOf(whichSide) < 0) {
            throw new Error('Arg "whichSide" must be either top, bottom, left or right; got "' + whichSide + '"');
        }

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

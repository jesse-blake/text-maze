'use strict';

// An object to represent one of a Character's four sides. For every Character
// added as a path in the maze, its four sides (four Side objects) are added
// to a list. The list is shuffled to randomly add other Characters to the maze's
// path, by finding a Character opposite the side next chosen from the list.
module.exports = {
       
    init: function(ofChar, whichSide) {

        // A reference to the Character object this Side belongs to.
        this.ofChar = ofChar;

        // One of: top right bottom left
        this.whichSide = whichSide;
    },

    // Returns the name of this Side's opposite side.
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

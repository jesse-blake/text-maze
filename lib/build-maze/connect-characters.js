'use strict';

var utils               = require('../utilities');
var findAdjacentChar    = require('./connect-characters/find-adjacent-character');
var connectHorizontally = require('./connect-characters/connect-horizontally.js');
var specialCases        = require('./connect-characters/horizontal-special-cases.js');
var completeSpaces      = require('./connect-characters/complete-space-characters');

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

        adjChar = findAdjacentChar(maze, side);

        if (adjChar && (side.ofChar.connected + adjChar.connected === 1)) {
            if (side.whichSide === 'left' || side.whichSide === 'right') {
                connectHorizontally(maze, side, adjChar);
            }
            adjChar.connected = true;
            addSidesOfCharToSidelist(adjChar, sidelist);
        }
    }

    completeSpaces(maze, charlist);

    return;
};

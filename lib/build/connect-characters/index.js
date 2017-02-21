'use strict';

var utils               = require('../../utils');
var findAdjacentChar    = require('./find-adjacent-character');
var connectHorizontally = require('./horizontally.js');
var connectVertically   = require('./vertically.js');
var CharacterSide       = require('./CharacterSide');
var connectSpaces       = require('./connect-spaces');

module.exports = function(maze, charlist) {

    // Create and push four Side objects onto the side list, one for
    // each side of param 'character'.
    function addSidesOfCharToSidelist(character, sidelist) {
        var i, s, sides = ['top', 'right', 'bottom', 'left'];

        for (i = 0; i < sides.length; i++) {
            s = Object.create(CharacterSide);
            s.init(character, sides[i]);

            sidelist.push(s);
        }
    }

    // Sides of Characters to be connected.
    var side, sidelist = []; 

    // A Character adjacent to a given Side.
    var adjChar;

    // Connect the first Character.
    charlist[0].connected = utils.yes;

    // Add the first Character's sides to the side list.
    addSidesOfCharToSidelist(charlist[0], sidelist);

    while (sidelist.length) {
        utils.shuffleArrayInPlace(sidelist);

        side = sidelist.pop();

        // Sometimes an adjacent Character won't be found when looking above or below.
        adjChar = findAdjacentChar(maze, side);

        // Try to connect the side to the adjacent Character.
        if (adjChar && adjChar.connected === 0) {
            if (side.whichSide === 'left' || side.whichSide === 'right') {
                connectHorizontally(maze, side, adjChar);
            }
            else {
                connectVertically(maze, side, adjChar);
            }

            // Sometimes a vertical connection won't be made; in that case don't
            // add the sides of the unconnnected adjacent Character.
            if (adjChar.connected === utils.yes) {
                addSidesOfCharToSidelist(adjChar, sidelist);
            }
        }
    }

    connectSpaces(maze, charlist);

    return;
};

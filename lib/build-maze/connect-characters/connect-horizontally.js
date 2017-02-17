'use strict';

var utils             = require('../../utilities');
var mazeChars         = require('../maze-characters');
var horizSpecialCases = require('./horizontal-special-cases');

// Creates a horizontal connection between two Characters in the maze.
module.exports = function(maze, ch1Side, ch2) {

    var i;

    // To ascertain the side of ch2 that ch1 must connect to.
    var oppositeSideLookup = {
        'right': 'left',
        'left': 'right'
    };

    // Get connection location options for each Character.
    var ch1Opts = mazeChars.getConnectionOptsForSideOfChar(ch1Side.ofChar.ch, ch1Side.whichSide);
    var ch2Opts = mazeChars.getConnectionOptsForSideOfChar(ch2.ch, oppositeSideLookup[ch1Side.whichSide]);

    // Get the (fixed) x coordinate for horizontal connections.
    var x = ch1Side.ofChar.topLeftX < ch2.topLeftX ? ch2.topLeftX-1 : ch1Side.ofChar.topLeftX-1;

    var y;

    var charHgt = mazeChars.getCharHeight();

    // For special case when one of the Characters is a space: use connection
    // options from the other Character.
    var nonSpaceOpts;

    // A random index from which to start the search for a connection; rolls over
    // so all options are examined when necessary.
    var idx = utils.randomInRange(0, charHgt - 1);


    // Query for a hardcoded special case connection, in case one exists. Make sure
    // the query parameters are ordered correctly (left Character, right Character).
    var specialCaseConnection;

    if (ch1Side.ofChar.topLeftX < ch2.topLeftX) {
        specialCaseConnection = horizSpecialCases(ch1Side.ofChar.ch, ch2.ch);
    }
    else {
        specialCaseConnection = horizSpecialCases(ch2.ch, ch1Side.ofChar.ch);
    }


    // Now find a connection between the given characters, and set that connection in
    // the maze between the Characters.


    // A hardcoded special case was found, so use it: copy the bit array
    // values into the maze between the Characters being connected.
    if (specialCaseConnection) {
        y = ch1Side.ofChar.topLeftX < ch2.topLeftX ? ch2.topLeftY : ch1Side.ofChar.topLeftY;

        for (i = 0; i < specialCaseConnection.length; i++) {
            if (specialCaseConnection[i] === 1) {
                maze[y][x].connected = utils.connected;
            }
            y++; 
        }
        return;
    }

    // One of the Characters to be connected is a space (another kind of
    // special case). Randomly choose a connection option from the non-space 
    // Character's options.
    else if (ch1Side.ofChar.ch === ' ' || ch2.ch === ' ') {
        nonSpaceOpts = (ch2.ch === ' ') ? ch1Opts : ch2Opts;

        for (i = 0; i < charHgt; i++) {
            if (nonSpaceOpts[idx] === 1) {
                maze[ch2.topLeftY + idx][x].connected = utils.connected;
                return;
            }
            idx = (idx + 1) % charHgt;
        }
    }

    // Normal case: randomly choose a connection option compatible with
    // both Characters.
    else {
        for (i = 0; i < charHgt; i++) {
            if (ch1Opts[idx] === 1 && ch2Opts[idx] === 1) {
                maze[ch2.topLeftY + idx][x].connected = utils.connected;
                return;
            }
            idx = (idx + 1) % charHgt;
        }
    }

    throw new Error('A connection between the Characters should have been found.');
};

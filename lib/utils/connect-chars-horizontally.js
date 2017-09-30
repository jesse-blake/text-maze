'use strict';

var utils = require('./index');

// Creates a horizontal connection in the maze between two Chars that are
// situated one beside the other such that their y coordinates are exactly the
// same (all characters have a map of equal height).
module.exports = function(maze, ch1Side, ch2) {

    var i;

    // Save some typing.
    var ch1 = ch1Side.ofChar;

    // Get connection options for each Char.
    var ch1Opts = utils.charMaps.getConnectionOptsForSideOfChar(ch1.ch, ch1Side.whichSide);
    var ch2Opts = utils.charMaps.getConnectionOptsForSideOfChar(ch2.ch, ch1Side.getNameOfOppositeSide());

    // Get this connection's x coordinate.
    var x = ch1.topLeftX < ch2.topLeftX ? ch2.topLeftX-1 : ch1.topLeftX-1;

    var y;

    var charHgt = utils.charMaps.getCharHeight();

    // A random index from which to start the search for a connection; rolls over
    // so all options are examined when necessary.
    var idx = utils.randomInRange(0, charHgt - 1);

    var specialCaseConnection;


    // Query for a hardcoded special case connection, in case one exists. Make sure
    // the query parameters are ordered correctly (left Char, right Char).
    if (ch1.topLeftX < ch2.topLeftX) {
        specialCaseConnection = findSpecialCase(ch1.ch, ch2.ch);
    }
    else {
        specialCaseConnection = findSpecialCase(ch2.ch, ch1.ch);
    }


    // Now find a connection between the given characters, and set that connection in
    // the maze between the Chars.


    // Special case: A hardcoded special case was found, so use it: copy the bit array
    // values into the maze between the Chars being connected.
    if (specialCaseConnection) {
        y = ch1.topLeftX < ch2.topLeftX ? ch2.topLeftY : ch1.topLeftY;

        for (i = 0; i < specialCaseConnection.length; i++) {
            if (specialCaseConnection[i]) {
                // Set connected on the blank Chars that are part of the special
                // connection.
                maze[y][x].connected = true;
            }
            y++;
        }

        // Set connected on the unconnected Char.
        ch2.connected = true;

        return;
    }

    // Normal case: randomly choose a connection option compatible with
    // both Chars.
    for (i = 0; i < charHgt; i++) {

        if (ch1Opts[idx] + ch2Opts[idx] === 2) {
            // Set connected on the blank Char that makes the connection.
            maze[ch2.topLeftY + idx][x].connected = true;

            // Set connected on the unconnected Char.
            ch2.connected = true;

            return;
        }

        idx = (idx + 1) % charHgt;
    }
};

// Returns the hardcoded special-case-connection bit array for leftChar
// connecting to rightChar, if it exists, otherwise returns null.
function findSpecialCase(leftChar, rightChar) {

    // All the hardcoded special cases.
    var cases = {
        'BT': [1,1,1,0,0],
        'B7': [1,1,1,0,0],
        'B?': [1,1,1,0,0],
        'B\'': [0,1,1,0,0],
        'C-': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        'DI': function() {
            return Math.random() > 0.5 ? [1,1,0,0,0] : [0,0,0,1,1];
        },
        'DT': [1,1,0,0,0],
        'DZ': function() {
            return Math.random() > 0.5 ? [1,1,0,0,0] : [0,0,0,1,1];
        },
        'D7': [1,1,0,0,0],
        'D.': [0,0,0,1,1],
        'D?': [1,1,0,0,0],
        'FJ': [0,0,1,1,0],
        'F1': function() {
            return Math.random() > 0.33 ? [1,1,0,0,0]
                : Math.random() > 0.5 ? [0,1,1,0,0]
                    : [0,0,1,1,1];
        },
        'F.': [0,0,1,1,1],
        'I-': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        'K-': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,0];
        },
        'LT': [1,1,1,1,1],
        'LV': [0,0,0,1,1],
        'L4': [0,0,1,1,1],
        'L7': [1,1,1,1,1],
        'L9': [0,0,1,1,1],
        'L?': [1,1,1,1,1],
        'L-': [0,0,1,1,1],
        'L\'': [0,1,1,1,1],
        'PJ': [0,0,1,1,0],
        'P.': [0,0,1,1,1],
        'QT': [1,1,1,1,1],
        'QV': [0,0,0,1,1],
        'Q4': [0,0,1,1,1],
        'Q7': [1,1,1,1,1],
        'Q9': [0,0,1,1,1],
        'Q?': [1,1,1,1,1],
        'Q-': [0,0,1,1,1],
        'Q\'': [0,1,1,1,1],
        'RT': [1,1,1,1,0],
        'R4': [0,0,1,1,0],
        'R7': [1,1,1,1,0],
        'R9': [0,0,1,1,0],
        'R?': [1,1,1,1,0],
        'R-': [0,0,1,1,0],
        'R\'': [0,1,1,1,0],
        'TJ': [1,1,1,1,0],
        'T1': [1,1,0,0,0],
        'T.': [1,1,1,1,1],
        'T-': [1,1,1,0,0],
        'V.': [0,0,0,1,1],
        'X-': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,0];
        },
        'Z-': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        '1T': [1,1,1,1,1],
        '1V': [0,0,0,1,1],
        '14': [0,0,1,1,1],
        '17': [1,1,1,1,1],
        '19': [0,0,1,1,1],
        '1?': [1,1,1,1,1],
        '1-': [0,0,1,1,1],
        '1\'': [0,1,1,1,1],
        '51': [0,0,0,1,1],
        '5.': [0,0,0,1,1],
        '5-': [0,0,1,1,0],
        '.T': [1,1,1,1,1],
        '.V': [0,0,0,1,1],
        '.4': [0,0,1,1,1],
        '.7': [1,1,1,1,1],
        '.9': [0,0,1,1,1],
        '.?': [1,1,1,1,1],
        '.-': [0,0,1,1,1],
        '.\'': [0,1,1,1,1],
        '?J': [0,0,1,1,0],
        '?.': [0,0,1,1,1],
        '-I': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        '-J': [0,0,1,1,0],
        '-T': [1,1,1,0,0],
        '-X': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,0];
        },
        '-Z': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        '-1': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,1];
        },
        '-7': [1,1,1,0,0],
        '-.': [0,0,1,1,1],
        '-?': [1,1,1,0,0],
        '-\'': [0,1,1,0,0],
        '\'J': [0,1,1,1,0],
        '\'.': [0,1,1,1,1],
        '\'-': [0,1,1,0,0],
    };

    var result = null;

    // Create the index into the cases hash.
    var specialCase = '' + leftChar.toUpperCase() + rightChar.toUpperCase();

    if (specialCase in cases) {
        result = (typeof cases[specialCase] === 'function') ? cases[specialCase]() : cases[specialCase];
    }

    return result;
}

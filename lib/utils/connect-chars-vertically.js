'use strict';

var utils = require('./index');

// TODO Better vertical character connection alg. Sometimes characters don't connect.
//
// Creates a vertical connection in the maze between two Chars that are
// situated one above the other (their x coordinates overlap by at least one
// column in the maze).
module.exports = function(maze, ch1Side, ch2) {

    var i;

    // Save some typing.
    var ch1 = ch1Side.ofChar;

    // Get connection options for each Char.
    var ch1Opts = utils.charMaps.getConnectionOptsForSideOfChar(ch1.ch, ch1Side.whichSide);
    var ch2Opts = utils.charMaps.getConnectionOptsForSideOfChar(ch2.ch, ch1Side.getNameOfOppositeSide());

    // Get this connection's static y coordinate.
    var y = ch1.topLeftY < ch2.topLeftY ? ch2.topLeftY-1 : ch1.topLeftY-1;

    // Get the length of each Char.
    var ch1Len = utils.charMaps.getLengthOfCharInMaze(ch1.ch);
    var ch2Len = utils.charMaps.getLengthOfCharInMaze(ch2.ch);

    // Get the start index for looping through each Char's connection options
    // based on where the Chars begin overlapping along the x axis.
    var ch1Start = (ch1.topLeftX <= ch2.topLeftX) ? Math.abs(ch1.topLeftX - ch2.topLeftX) : 0;
    var ch2Start = (ch1.topLeftX <= ch2.topLeftX) ? 0 : Math.abs(ch1.topLeftX - ch2.topLeftX);

    // Get the length of the overlap in columns of the maze.
    var overlap = (ch1Len-ch1Start <= ch2Len-ch2Start) ? ch1Len-ch1Start : ch2Len-ch2Start;

    // Get the end index for looping through each Char's connection options.
    var ch1End = ch1Start + overlap - 1;
    var ch2End = ch2Start + overlap - 1;

    // Choose a random start index within the start and end indices, and roll over to start
    // when end is exceeded in the loop.
    var ch1Idx = utils.randomInRange(ch1Start, ch1End);
    var ch2Idx = ch2Start + ch1Idx - ch1Start;


    // Loop for the length of the overlap
    for (i = 0; i < overlap; i++) {

        // Search for a column in the maze in which both Chars are able to connect.
        if (ch1Opts[ch1Idx] + ch2Opts[ch2Idx] === 2) {
            maze[y][ch2.topLeftX + ch2Idx].connected = true;
            ch2.connected = true;
            return;
        }

        // Roll over to start index when end is exceeded.
        ch1Idx = ch1Idx > ch1End ? ch1Start : ch1Idx + 1;
        ch2Idx = ch2Idx > ch2End ? ch2Start : ch2Idx + 1;
    }

    return;
};

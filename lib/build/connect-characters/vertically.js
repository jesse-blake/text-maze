'use strict';

var utils    = require('../../utils');
var CharMaps = require('../CharacterMaps');

// Creates a vertical connection in the maze between two Characters that are
// situated one above the other (their x coordinates overlap by at least one
// column in the maze).
module.exports = function(maze, ch1Side, ch2) {

    var i;

    // Get connection options for each Character.
    var ch1Opts = CharMaps.getConnectionOptsForSideOfChar(ch1Side.ofChar.ch, ch1Side.whichSide);
    var ch2Opts = CharMaps.getConnectionOptsForSideOfChar(ch2.ch, ch1Side.getNameOfOppositeSide());

    // Get this connection's static y coordinate.
    var y = ch1Side.ofChar.topLeftY < ch2.topLeftY ? ch2.topLeftY-1 : ch1Side.ofChar.topLeftY-1;

    // Get the length of each Character.
    var ch1Len = CharMaps.getLengthOfCharInMaze(ch1Side.ofChar.ch);
    var ch2Len = CharMaps.getLengthOfCharInMaze(ch2.ch);

    // Get the start index for looping through each Character's connection options
    // based on where the Characters begin overlapping along the x axis.
    var ch1Idx = (ch1Side.ofChar.topLeftX <= ch2.topLeftX) ? Math.abs(ch1Side.ofChar.topLeftX - ch2.topLeftX) : 0;
    var ch2Idx = (ch1Side.ofChar.topLeftX <= ch2.topLeftX) ? 0 : Math.abs(ch1Side.ofChar.topLeftX - ch2.topLeftX);

    // Get the length of the overlap in columns of the maze.
    var overlap = (ch1Len-ch1Idx <= ch2Len-ch2Idx) ? ch1Len-ch1Idx : ch2Len-ch2Idx;


    // Loop for the length of the overlap looking for a column in the maze in which
    // both Characters are able to connect.
    for (i = 0; i < overlap; i++) {

        if (ch1Opts[ch1Idx] + ch2Opts[ch2Idx] === 2) {
            maze[y][ch2.topLeftX + ch2Idx].connected = utils.yes;
            ch2.connected = utils.yes;
            return;
        }

        ch1Idx++;
        ch2Idx++;
    }

    // TODO Hardcode special or algorithm to find more complicated connections instead
    // of ignoring by not connecting.
    return;
};

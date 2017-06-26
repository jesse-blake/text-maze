'use strict';

var utils = require('./index');

// Fill our each line with space chars so paths are rendered in these space chars, filling out the maze.
module.exports = function(lines, width) {
    var i, j, chars, lineLen = 0;

    // TODO Global state: char spacing should be in global state.
    var charSpacing = 1;

    // Size does not include maze border on either side (-2).
    var maxLineLen = width - 2;

    for (i = 0; i < lines.length; i++) {

        chars = lines[i].split('');

        // Line length includes character spacing and a border at either end.
        lineLen = charSpacing * (chars.length - 1);

        // Add length of each character to the line length.
        for (j = 0; j < chars.length; j++) {

            lineLen += utils.charMaps.getLengthOfCharInMaze(chars[j]);
        }

        // Pad to end of line with spaces.
        while (maxLineLen - lineLen >= 2) {
            lines[i] += ' ';
            lineLen += charSpacing + utils.charMaps.getLengthOfCharInMaze(' ');
        }
    }

    return lines;
};

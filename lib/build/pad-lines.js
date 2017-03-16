'use strict';

var CharMaps = require('./CharacterMaps');

module.exports = function(lines, maxMazeWidth, locationSize) {
    var i, j, chars, lineLen = 0;

    var charSpacing = 1;

    // Size does not include maze border on either side (-2).
    var maxLineLen = maxMazeWidth / locationSize - 2;

    for (i = 0; i < lines.length; i++) {

        chars = lines[i].split('');

        // Line length includes character spacing and a border at either end.
        lineLen = charSpacing * (chars.length - 1);

        // Add length of each character to the line length.
        for (j = 0; j < chars.length; j++) {

            lineLen += CharMaps.getLengthOfCharInMaze(chars[j]); 
        }

        // Add special padding character to help pad to very end of line
        // when num spaces to pad is odd.
        if (maxLineLen - lineLen >= 3 && (maxLineLen - lineLen) % 2 === 1) {
            lines[i] += '*'; 
            lineLen += charSpacing + CharMaps.getLengthOfCharInMaze('*');
        }
    
        // Pad to end of line with spaces.
        while (lineLen < maxLineLen) {
            lines[i] += ' ';
            lineLen += charSpacing + CharMaps.getLengthOfCharInMaze(' ');
        }
    }
};

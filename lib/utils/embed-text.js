'use strict';

const utils = require('./index');

// Embed the text by converting each ascii character into a Char object, and referencing that Char 
// object from every cell in the maze array corresponding to that character.
module.exports = function(lines, width) {
    
    const maze = [], charlist = [];

    var i, j, k, l;
    
    // An 'ascii' character from a string in the lines array.
    var ch;

    // For initializing Char objects.
    var charObj, blank;

    const charHgt = utils.charMaps.getCharHeight();

    // TODO This is old code: lines should be padded to end now, except possibly for one cell, which I intend to fix.
    // Length of lines above and below a blank line.
    // The larger of the two will be the numCharBlanksToAdd to the blank line.
    var lenAbove, lenBelow, numCharBlanksToAdd;

    // Add a blank line at the top of the maze.
    maze.push([]);

    // For each line of text.
    for (i = 0; i < lines.length; i++) {

        // Add charHgt rows to the maze, to build in the current line of text.
        // Begin each row with a blank Char to create the maze's left border.
        for (j = 0; j < charHgt; j++) {
            blank = Object.create(utils.Char);
            blank.initBlank();
            maze.push([blank]);
        }

        // Embed each character in the current line in the maze.
        for (j = 0; j < lines[i].length; j++) {
            ch = lines[i].charAt(j);

            charObj = Object.create(utils.Char);
            charObj.init(ch, maze[maze.length - charHgt].length, maze.length - charHgt);
            charlist.push(charObj);

            // Add each row of the current character's map to the current line of text in the maze.
            for (k = charHgt; k > 0; k--) {

                // Push a reference to the current Char into each location in the maze that the Char occupies.
                for (l = 0; l < utils.charMaps.getLengthOfCharInMaze(ch); l++) {
                    maze[maze.length - k].push(charObj);
                }

                // Always add spacing between Chars using blank Char.
                // Spacing after the last Char in the line will be the right border.
                blank = Object.create(utils.Char);
                blank.initBlank();
                maze[maze.length - k].push(blank);
            }
        }

        // Add a blank line after every embeded line of text.
        if (i < lines.length - 1) {
            maze.push([]);
        }
    }

    // Add a blank line at the bottom of the maze.
    maze.push([]);

    // Add blank Chars to the blank lines, and maybe fill in the end of some lines.
    // TODO Find a way to add the last unused cell in some lines as path in the maze.
    for (i = 0; i < maze.length; i++) {
        while (maze[i].length < width) {
            blank = Object.create(utils.Char);
            blank.initBlank();
            maze[i].push(blank);
        }
    }

    return [maze, charlist];
};

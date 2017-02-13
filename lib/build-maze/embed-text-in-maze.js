'use strict';

var mazeChars = require('./maze-characters');

module.exports = function(maze, charlist, lines) {

    var i, j, k, ch;

    var charHgt = mazeChars.getCharHeight();

    // An object for each character in the maze to facilitate building the maze
    var Char = {
        ch: null,
        topLeftX: null,
        topLeftY: null
    };

    // For initializing the Char objects stored in the charlist
    var character;
    
    // Length of lines above and below a blank line
    // The larger of the two will be the numComponentsToAdd to the blank line
    var lenAbove, lenBelow, numComponentsToAdd;

    // Add a blank line at the top of the maze
    maze.push([]);

    // For each line of text
    for (i = 0; i < lines.length; i++) {

        // Add arrays to the maze to build this line of text into the maze
        for (j = 0; j < charHgt; j++) {
            maze.push([0]);
        }

        // Add each character in the current line to the maze
        for (j = 0; j < lines[i].length; j++) {
            ch = lines[i].charAt(j);

            character = Object.create(Char);
            character.ch = ch;
            character.topLeftX = maze[maze.length - charHgt].length;
            character.topLeftY = maze.length - charHgt;
            charlist.push(character);

            // Add each row of the current maze-character to the current line of text in the maze
            for (k = charHgt; k > 0; k--) {
                maze[maze.length - k].push.apply(maze[maze.length - k], mazeChars.getRowOfChar(ch, charHgt - k));

                // Add spacing between characters, but not at the end of the line
                if (lines[i].length) {
                    maze[maze.length - k].push.call(maze[maze.length - k], 0);
                }
            }
        }

        // Add a blank line after every line
        if (i < lines.length - 1) {
            maze.push([]); 
        }
    }

    // Add a blank line at the bottom of the maze
    maze.push([]);

    // Add components to the blank lines
    for (i = 0; i < maze.length; i += 6) {
        lenAbove = (i === 0) ? 0 : maze[i-1].length;

        lenBelow = (i === maze.length-1) ? 0 : maze[i+1].length;

        numComponentsToAdd = (lenAbove > lenBelow) ? lenAbove : lenBelow;

        for (j = 0; j < numComponentsToAdd; j++) {
            maze[i].push(0); 
        }
    }

    // Nothing to return; this module modifies its parameters 'maze' and 'charlist'
    return;
};

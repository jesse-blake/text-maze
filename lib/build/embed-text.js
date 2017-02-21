'use strict';

var CharMaps       = require('./CharacterMaps');
var Character      = require('./Character');
var CharacterBlank = require('./CharacterBlank');

module.exports = function(maze, charlist, lines) {

    var i, j, k, l, ch;

    var charHgt = CharMaps.getCharHeight();

    // For initializing the Character/CharacterBlank objects.
    var character, characterBlank;

    // Length of lines above and below a blank line.
    // The larger of the two will be the numCharBlanksToAdd to the blank line.
    var lenAbove, lenBelow, numCharBlanksToAdd;

    // Add a blank line at the top of the maze.
    maze.push([]);

    // For each line of text.
    for (i = 0; i < lines.length; i++) {

        // Add arrays to the maze to build this line of text into the maze.
        // Start each array with a CharacterBlank to create the maze's left border.
        for (j = 0; j < charHgt; j++) {
            characterBlank = Object.create(CharacterBlank);
            characterBlank.init();
            maze.push([characterBlank]);
        }

        // Add each character in the current line to the maze.
        for (j = 0; j < lines[i].length; j++) {
            ch = lines[i].charAt(j);

            character = Object.create(Character);
            character.init(ch, maze[maze.length - charHgt].length, maze.length - charHgt);
            charlist.push(character);

            // Add each row of the current Character's character map to the current
            // line of text in the maze.
            for (k = charHgt; k > 0; k--) {

                // Push a reference to the current Char into each location in the maze that the Char occupies.
                for (l = 0; l < CharMaps.getLengthOfCharInMaze(ch); l++) {
                    maze[maze.length - k].push(character);
                }

                // Add spacing between characters using CharacterBlank.
                if (lines[i].length) {
                    characterBlank = Object.create(CharacterBlank);
                    characterBlank.init();
                    maze[maze.length - k].push.call(maze[maze.length - k], characterBlank);
                }
            }
        }

        // Add a blank line after every embeded line of text.
        if (i < lines.length - 1) {
            maze.push([]); 
        }
    }

    // Add a blank line at the bottom of the maze.
    maze.push([]);

    // Add CharacterBlanks to the blank lines.
    for (i = 0; i < maze.length; i += 6) {
        lenAbove = (i === 0) ? 0 : maze[i-1].length;

        lenBelow = (i === maze.length-1) ? 0 : maze[i+1].length;

        numCharBlanksToAdd = (lenAbove > lenBelow) ? lenAbove : lenBelow;

        for (j = 0; j < numCharBlanksToAdd; j++) {
            characterBlank = Object.create(CharacterBlank);
            characterBlank.init();
            maze[i].push(characterBlank); 
        }
    }

    // Nothing to return; this module modifies its parameters 'maze' and 'charlist'
    return;
};
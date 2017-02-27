'use strict';

var CharMaps = require('./CharacterMaps');

// Determine and set the coordinates for where the maze starts and ends.
module.exports = function(maze, endpoints) {
    var i, x, y, character, opts;

    // Start the maze to the left of the first character.
    character = maze[1][1];
    opts = CharMaps.getConnectionOptsForSideOfChar(character.ch, 'left');

    // Start adjacent to the highest part of the first character.
    for (i = 0; i < opts.length; i++) {
        if (opts[i]) {
            endpoints.start.x = 0;
            endpoints.start.y = i + 1;
            break;
        }
    }

    // End the maze to the right of the last character.
    y = maze.length - 2;
    x = maze[y].length - 2;
    character = maze[y][x];
    opts = CharMaps.getConnectionOptsForSideOfChar(character.ch, 'right');

    // End adjacent to the lowest part of the last character.
    for (i = 0; i < opts.length; i++) {
        if (opts[opts.length - 1 - i]) {
            endpoints.end.x = x + 1;
            endpoints.end.y = y - i;
            break;
        }
    }
};

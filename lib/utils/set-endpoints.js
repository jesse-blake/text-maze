'use strict';

var utils = require('./index');

// Determine and set the coordinates for where the maze starts and ends.
module.exports = function(maze) {
    var i, x, y, charObj, opts;

    const endpoints = {
        start: { x: null, y: null },
        end:   { x: null, y: null }
    };

    // Start the maze to the left of the first Char.
    charObj = maze[1][1];
    opts = utils.charMaps.getConnectionOptsForSideOfChar(charObj.ch, 'left');

    // Start adjacent to the highest part of the first Char.
    for (i = 0; i < opts.length; i++) {
        if (opts[i]) {
            endpoints.start.x = 0;
            endpoints.start.y = i + 1;
            break;
        }
    }

    // End the maze to the right of the last Char.
    y = maze.length - utils.charMaps.getCharHeight() - 1;
    x = maze[y].length - 2;

    charObj = maze[y][x];

    // TODO Will this be a prob if padding doesn't get to end of last line?
    // If last Char is a space, set its lower cells to connected
    // so the maze's end can be in the very bottom corner.
    if (charObj.ch === ' ') {
        for (i = utils.charMaps.getCharHeight() - 1; i >= 0; i--) {
            if (charObj.spaceCharConnectionArray[i]) {
                break;
            }
            else {
                charObj.spaceCharConnectionArray[i] = 1;
            }
        }

        opts = charObj.spaceCharConnectionArray;
    }
    else {
        opts = utils.charMaps.getConnectionOptsForSideOfChar(charObj.ch, 'right');
    }

    // End adjacent to the lowest possible part of the last Char.
    for (i = 0; i < opts.length; i++) {
        if (opts[opts.length - 1 - i]) {
            endpoints.end.x = x + 1;
            endpoints.end.y = y + utils.charMaps.getCharHeight() - 1 - i;
            break;
        }
    }

    return [maze, endpoints];
};

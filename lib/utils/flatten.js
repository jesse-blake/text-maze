'use strict';

// Simplify the maze so it's easier to paint, solve, etc: each cell in the
// maze will reference its own object.
module.exports = function(maze) {
    var x, y;

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            maze[y][x] = maze[y][x].flatten(x, y);
        }
    }

    return maze;
};

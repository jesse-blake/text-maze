'use strict';

// Simplify the maze so it's easier to paint, solve, etc: each cell in the
// maze will reference its own object.
module.exports = function(maze, endpoints) {
    var x, y;

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            maze[y][x] = maze[y][x].flatten(x, y);
        }
    }

    maze[endpoints.start.y][endpoints.start.x] = 1;

    maze[endpoints.end.y][endpoints.end.x] = 1;

    return maze;
};

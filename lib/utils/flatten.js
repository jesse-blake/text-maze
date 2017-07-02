'use strict';

// Simplify the maze so it's easier to paint, solve, etc: each cell in the
// maze will reference its own object.
module.exports = function(maze, endpoints) {
    var x, y;

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            maze[y][x] = maze[y][x].flatten(x, y, state.colors);
        }
    }

    // Set the maze's start.
    maze[endpoints.start.y][endpoints.start.x].start      = true;
    maze[endpoints.start.y][endpoints.start.x].path       = true;
    maze[endpoints.start.y][endpoints.start.x].connection = true;

    // Set the end endpoint.
    maze[endpoints.end.y][endpoints.end.x].end            = true;
    maze[endpoints.end.y][endpoints.end.x].path           = true;
    maze[endpoints.end.y][endpoints.end.x].connection     = true;

    return maze;
};

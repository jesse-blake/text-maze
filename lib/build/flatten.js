'use strict';

var utils = require('../utils');

// Simplify the maze so it's easier to paint, solve, etc: each location in the
// maze will reference its own object.
module.exports = function(maze, endpoints) {
    var x, y;

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            maze[y][x] = maze[y][x].flattenCharacter(x, y);
        }
    }

    // Set the maze's start.
    maze[endpoints.start.y][endpoints.start.x].start      = utils.yes;
    maze[endpoints.start.y][endpoints.start.x].path       = utils.yes;
    maze[endpoints.start.y][endpoints.start.x].connection = utils.yes;

    // Set the end endpoint.
    maze[endpoints.end.y][endpoints.end.x].end            = utils.yes;
    maze[endpoints.end.y][endpoints.end.x].path           = utils.yes;
    maze[endpoints.end.y][endpoints.end.x].connection     = utils.yes;
};

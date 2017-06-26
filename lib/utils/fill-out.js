'use strict';

var utils = require('../utils');

module.exports = function(maze) {
    var x, y, i;

    var locations = [];

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {
            locations.push([x, y]);
        }
    }

    utils.shuffleArrayInPlace(locations);

    for (i = 0; i < locations.length; i++) {
        x = locations[i][0];
        y = locations[i][1];

        if (y > 0 && x > 0 && y < maze.length-1 && x < maze[y].length-1) {
            if (!maze[y][x].path) {
                checkAround(maze, x, y);
            }
        }
    }
};

function checkAround(maze, x, y) {
    var i, adjacent, addPath = false;

    var onlyOneConnection = maze[y-1][x].path +
                            maze[y+1][x].path +
                            maze[y][x-1].path +
                            maze[y][x+1].path === 1;

    if (!onlyOneConnection) {
        return false;
    }

    switch (true) {
        case maze[y-1][x].path:
            addPath = maze[y+1][x-1].path + maze[y+1][x+1].path === 0;
            break;

        case maze[y+1][x].path:
            addPath = maze[y-1][x-1].path + maze[y-1][x+1].path === 0;
            break;

        case maze[y][x-1].path:
            addPath = maze[y-1][x+1].path + maze[y+1][x+1].path === 0;
            break;

        case maze[y][x+1].path:
            addPath = maze[y-1][x-1].path + maze[y+1][x-1].path === 0;
    }

    if (addPath) {
        maze[y][x].path = true;
        maze[y][x].connection = true;

        adjacent = [[x,y-1], [x,y+1], [x-1,y], [x+1,y]];

        utils.shuffleArrayInPlace(adjacent);

        for (i = 0; i < adjacent.length; i++) {
            x = adjacent[i][0];
            y = adjacent[i][1];

            if (!maze[y][x].path) {
                if (y > 0 && x > 0 && y < maze.length-1 && x < maze[y].length-1) {
                    checkAround(maze, x, y);
                }
            }
        }
    }
}

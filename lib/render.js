'use strict';

var utils = require('./utils');

module.exports = function(maze, locationSize, canvasContext) {

    var x, y, color;

    for (y = 0; y < maze.length; y++) {

        for (x = 0; x < maze[y].length; x++) {

            color = maze[y][x].getColor(x, y);

            utils.paintMazeLocation(canvasContext, color, x * locationSize, y * locationSize, locationSize);
        }
    }
};

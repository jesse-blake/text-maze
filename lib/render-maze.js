'use strict';

var locationPainter = require('./location-painter');

module.exports = function(maze, locationSize, canvasContext) {
    var x, y, color;

    for (y = 0; y < maze.length; y++) {

        for (x = 0; x < maze[y].length; x++) {

            color = maze[y][x].getColor(x, y);

            locationPainter(canvasContext, color, x * locationSize, y * locationSize, locationSize);
        }
    }
};

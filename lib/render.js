'use strict';

var utils = require('./utils');

module.exports = function(maze, locationSize) {
    var x, y, color;

    var mazeColors = ['lightgray', 'black', '#888'];

    var canvasContext = utils.getCanvasContext();

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            color = maze[y][x].path ? mazeColors[1 + maze[y][x].connection] : mazeColors[0];

            utils.paintMazeLocation(canvasContext, color, x * locationSize, y * locationSize, locationSize);
        }
    }
};

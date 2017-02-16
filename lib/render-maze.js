'use strict';

var compPainter = require('./component-painter');

module.exports = function(maze, componentSize, canvasContext) {
    var x, y, color;

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            if (maze[y][x] === 0) {
                color = 'lightgray'; 
            }
            else if (maze[y][x] === 43) {
                color = 'red';
            }
            else if (maze[y][x].ch === ' ') {
                if (maze[y][x].bitarray[y - maze[y][x].topLeftY] === 1) {
                    color = 'red';
                }
                else {
                    color = 'lightgray';
                }
            }
            else {
                color = maze[y][x].locationInCharIsOnPath(x, y) ? 'black' : 'lightgray';
            }

            compPainter(canvasContext, color, x * componentSize, y * componentSize, componentSize);
        }
    }
};

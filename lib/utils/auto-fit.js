'use strict';

var utils = require('./index');

// Find cell size and maze width to fit maze in screen.
module.exports = function(text, mazeMargin) {

    // Default margin in pixels: no margin.
    mazeMargin = mazeMargin || 100;

    // Smallest cell size that looks ok when rendered.
    var MIN_CELL_SIZE = 5;

    // Begin with the smallest location size, then test while increasing it.
    var cellSize = MIN_CELL_SIZE;

    // Max maze height: fits in the viewport and margins.
    var MAX_MAZE_HEIGHT = getMaxMazeHeight(cellSize, mazeMargin);

    // The maze width: its max based on screen/cell/viewport size.
    var width = getMaxMazeWidth(cellSize, mazeMargin);

    var lines = utils.breakTextIntoLines(text, width);

    while (computeMazeHeight(lines, cellSize) <= MAX_MAZE_HEIGHT) {
        cellSize++;
        width = getMaxMazeWidth(cellSize, mazeMargin);
        lines = utils.breakTextIntoLines(text, width);
    }

    // Location size is too big when the loop ends, so decrement it.
    cellSize = cellSize > MIN_CELL_SIZE ? cellSize - 1 : cellSize;

    width = getMaxMazeWidth(cellSize, mazeMargin);

    return { cellSize: cellSize, width: width };
};

// Returns the max height, which depends on the screen height and the margin size.
function getMaxMazeHeight(cellSize, mazeMargin) {
    var wh   = window.innerHeight;
    var menu = document.querySelector('.maze-bar');

    // Subtract the maze menu's height.
    if (menu) {
        return wh - menu.clientHeight - (2 * mazeMargin);
    }
    return wh - mazeMargin * 2;
}

// Returns the height the maze will be in pixels given the number of lines
// of text in the maze and the location size.
function computeMazeHeight(lines, cellSize) {
    var charHgt = utils.charMaps.getCharHeight();

    return cellSize * (charHgt * lines.length + lines.length + 1);
}

// Returns maze's max width in array-length based on viewport size and desired
// pixel margin.
//
// @arg int cellSize: With in pixels of a maze cell.
// @arg int margin: Margin in pixels between maze and viewport edge.
function getMaxMazeWidth(cellSize, mazeMargin) {
    var ww  = window.innerWidth;
    var max = ww - (2 * mazeMargin);

    // The max width must be a multiple of the maze cell size.
    return Math.floor(max / cellSize);
}

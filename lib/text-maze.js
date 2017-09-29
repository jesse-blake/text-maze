'use strict';

var utils = require('./utils');

var MIN_CELL_SIZE = 5;
var MIN_MAZE_WIDTH = 20;

module.exports = {

    // @arg {string}  string         Text to embed in the maze's paths.
    // @arg {Object=} options        Maze options.
    // @arg {number=} options.width  Max maze width as an array length.
    // @arg {number=} options.margin Integer margin in pixels between maze and viewport/maze-bar.
    init: function(text, options) {

        var result, cellSize, width, lines, maze, charlist, endpoints;

        validateConfig(text, options);

        options = options || {};

        if (options.width) {
            cellSize = null;
            width    = options.width;
        }
        else {
            result   = utils.autoFit(text, options.margin);
            cellSize = result.cellSize;
            width    = result.width;
        }

        lines = utils.breakTextIntoLines(text, width);

        lines = utils.padLines(lines, width);

        result   = utils.embedText(lines, width);
        maze     = result.maze;
        charlist = result.charlist;

        maze = utils.connectChars(maze, charlist);

        maze = utils.connectSpaces(maze, charlist);

        // TODO Verify all chars are connected or fix vertical connection alg.

        maze = utils.flatten(maze, endpoints);

        maze = utils.fillOut(maze);

        result    = utils.setEndpoints(maze);
        maze      = result.maze;
        endpoints = result.endpoints;

        maze = utils.solve(maze, endpoints);

        // When width is provided as an option, cell size is null.
        return { maze: maze, endpoints: endpoints, cellSize: cellSize };
    }
};

function validateConfig(text, options) {
    if (typeof text !== 'string' || text === '') {
        throw new TypeError('Text Maze: arg "text" must be a non-empty string.');
    }

    if (options === null || (typeof options !== 'object' && typeof options !== 'undefined')) {
        throw new TypeError('Text Maze: arg "options" must an object or undefined.');
    }

    for (var o in options) {
        if (['width', 'margin'].indexOf(o) < 0) {
            throw new TypeError('Text Maze: unrecognized option "' + o + '".');
        }
    }

    if (options && 'width' in options) {
        if (typeof options.width !== 'number' || options.width % 1 !== 0 || options.width < MIN_MAZE_WIDTH) {
            throw new TypeError('Text Maze: option "width" must be an integer >= ' + MIN_MAZE_WIDTH + '.');
        }
    }

    if (options && 'margin' in options) {
        if (typeof options.margin !== 'number' || options.margin % 1 !== 0 || options.margin < 0) {
            throw new TypeError('Text Maze: option "margin" must be an integer >= zero.');
        }

        var maxMargin = Math.floor((window.innerWidth - MIN_CELL_SIZE * MIN_MAZE_WIDTH) / 2);

        if (options.margin > maxMargin) {
            throw new TypeError('Text Maze: option "margin" must leave ' + (MIN_CELL_SIZE * MIN_MAZE_WIDTH) + 'px free horizontally between margins (i.e. margin must be <= ' + maxMargin + ' for the current screen).');
        }
    }
}

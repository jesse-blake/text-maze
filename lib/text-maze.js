'use strict';

var utils = require('./utils');

module.exports = {

    init: function(text) {

        var result, cellSize, width, lines, maze, charlist, endpoints;

        validateConfig(text);

        result   = utils.autoFit(text);
        cellSize = result.cellSize;
        width    = result.width;

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

        return { maze: maze, cellSize: cellSize, endpoints: endpoints };
    }
};

function validateConfig(text) {
    if (typeof text !== 'string' || text === '') {
        throw new TypeError('Maze option "text" must be a non-empty string');
    }
}

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

        // TODO The following doesn't exist...should it, or just in tests.
        // It was a hack to render error text in the maze if the maze didn't fully connect.
        // Should just fix vertical connection alg so it need not exist.
        //
        // verifyConnections(maze, charlist);

        maze = utils.flatten(maze, endpoints);

        maze = utils.fillOut(maze);

        result    = utils.setEndpoints(maze);
        maze      = result.maze;
        endpoints = result.endpoints;

        return { maze: maze, cellSize: cellSize, endpoints: endpoints };
    }
};

function validateConfig(text) {
    if (typeof text !== 'string' || text === '') {
        throw new TypeError('Maze option "text" must be a non-empty string');
    }
}

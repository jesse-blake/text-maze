'use strict';

var utils = require('./utils');

module.exports = {

    init: function(text, width) {

        var lines, maze, charlist, endpoints;

        validateConfig(text, width);

        lines = utils.breakTextIntoLines(text, width);

        lines = utils.padLines(lines, width);

        [maze, charlist] = utils.embedText(lines, width);

        maze = utils.connectChars(maze, charlist);

        maze = utils.connectSpaces(maze, charlist);

        // TODO The following doesn't exist...should it, or just in tests.
        // It was a hack to render error text in the maze if the maze didn't fully connect.
        // Should just fix vertical connection alg so it need not exist.
        //
        // verifyConnections(maze, charlist);

        [maze, endpoints] = utils.setEndpoints(maze);

        maze = utils.flatten(maze, endpoints);

        return utils.fillOut(maze);
    }
};

function validateConfig(text, width) {

    if (typeof text !== 'string' || text === '') {
        throw new TypeError('Maze option "text" must be a non-empty string');
    }

    if (typeof width !== 'number' || width % 1 !== 0 || width <= 0) {
        throw new TypeError('Maze option "width" must be a positive integer');
    }
}

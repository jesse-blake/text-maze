'use strict';

var breakTextIntoLines = require('./break-text-into-lines');
var embedText          = require('./embed-text');
var connectCharacters  = require('./connect-characters/index');
var setEndpoints       = require('./set-endpoints');
var flatten            = require('./flatten');

module.exports = function(state) {

    var lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);

    var maze = [];

    // Ordered list of Character objects embedded in the maze.
    var charlist = [];

    embedText(maze, charlist, lines);

    connectCharacters(maze, charlist);

    setEndpoints(maze, state.endpoints);

    flatten(maze, state.endpoints);

    return maze;
};

'use strict';

var breakTextIntoLines = require('./break-text-into-lines');
var embedText          = require('./embed-text');
var connectCharacters  = require('./connect-characters/index');
var setEndpoints       = require('./set-endpoints');
var flatten            = require('./flatten');

module.exports = function(app) {

    var lines = breakTextIntoLines(app.text, app.maxMazeWidth, app.locationSize);

    var maze = [];

    // Ordered list of Character objects embedded in the maze.
    var charlist = [];

    embedText(maze, charlist, lines);

    connectCharacters(maze, charlist);

    setEndpoints(maze, app.endpoints);

    flatten(maze, app.endpoints);

    return maze;
};

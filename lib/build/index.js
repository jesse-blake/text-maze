'use strict';

var breakTextIntoLines = require('./break-text-into-lines');
var padLines           = require('./pad-lines');
var embedText          = require('./embed-text');
var connectCharacters  = require('./connect-characters/index');
var setEndpoints       = require('./set-endpoints');
var flatten            = require('./flatten');
var fillOut            = require('./fill-out');
var autoSize           = require('../load/auto-size');
var solve              = require('../solve');

module.exports = function(state) {

    var lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);

    padLines(lines, state.maxMazeWidth, state.locationSize);

    var maze = [];

    // Ordered list of Character objects embedded in the maze.
    var charlist = [];

    embedText(maze, charlist, lines);

    connectCharacters(maze, charlist);

    verifyConnections(maze, state, lines, charlist);

    setEndpoints(maze, state.endpoints);

    flatten(maze, state);

    fillOut(maze);

    solve.setSolution(maze, state);

    return maze;
};

// TODO Better vertical character connection alg.
// Vertical connections don't always happen. For that reason the maze
// is not always fully connected. This is a precaution/hack against
// trying to render unconnected mazes. (It's a hack because auto-size
// shouldn't be imported, and its functions shouldn't be copied into
// this this one.
function verifyConnections(maze, state, lines, charlist) {

    function getMaxMazeWidth(mazeMargin, locationSize) {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var max         = windowWidth * (1 - mazeMargin * 2);

        return max - (max % locationSize);
    }

    for (var i = 0; i < charlist.length; i++) {

        if (!charlist[i].connected) {

            state.text = 'error! try again';

            document.getElementById('maze-reset-ctrl').removeAttribute('disabled');

            autoSize(state, getMaxMazeWidth);
            lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);
            padLines(lines, state.maxMazeWidth, state.locationSize);
            maze.length = 0;
            charlist.length = 0;
            embedText(maze, charlist, lines);
            connectCharacters(maze, charlist);

            break;
        }
    }
}

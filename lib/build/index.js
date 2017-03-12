'use strict';

var breakTextIntoLines = require('./break-text-into-lines');
var embedText          = require('./embed-text');
var connectCharacters  = require('./connect-characters/index');
var setEndpoints       = require('./set-endpoints');
var flatten            = require('./flatten');
var autoSize           = require('../load/auto-size');

module.exports = function(state) {

    var lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);

    var maze = [];

    // Ordered list of Character objects embedded in the maze.
    var charlist = [];

    embedText(maze, charlist, lines);

    connectCharacters(maze, charlist);

    verifyConnections(maze, state, lines, charlist);

    setEndpoints(maze, state.endpoints);

    flatten(maze, state);

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
            document.getElementById('maze-text-input-ctrl').value = state.text;
            document.getElementById('maze-reset-ctrl').removeAttribute('disabled');

            // Build with text that will probably connect.
            state.text = 'error! try again';

            autoSize(state, getMaxMazeWidth);
            lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);
            maze = [];
            charlist = [];
            embedText(maze, charlist, lines);
            connectCharacters(maze, charlist);

            break;
        }
    }
}

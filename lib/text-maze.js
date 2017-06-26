'use strict';

var utils = require('./utils');

module.exports = {

    init: function(text, width, height) {

        var lines, maze, charlist;

        validateConfig(text, width, height);

        lines = utils.breakTextIntoLines(text, width);

        lines = utils.padLines(lines, width);

        [maze, charlist] = utils.embedText(lines, width);
    }
};

function validateConfig(text, width, height) {
    
    if (typeof text !== 'string' || text === '') {
        throw new TypeError('Maze option "text" must be a non-empty string');
    }

    if (typeof width !== 'number' || width % 1 !== 0 || width <= 0) {
        throw new TypeError('Maze option "width" must be a positive integer');
    }

    if (typeof height !== 'number' || height % 1 !== 0 || height <= 0) {
        throw new TypeError('Maze option "height" must be a positive integer');
    }
}

// module.exports = function(state) {

//done     var lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);

//done     padLines(lines, state.maxMazeWidth, state.locationSize);

//done     var maze = [];

//done     var charlist = [];

//done     embedText(maze, charlist, lines);

//     connectCharacters(maze, charlist);

//     verifyConnections(maze, state, lines, charlist);

//     setEndpoints(maze, state.endpoints);

//     flatten(maze, state);

//     fillOut(maze);

//     solve.setSolution(maze, state);

//     return maze;
// };

// // TODO Better vertical character connection alg.
// // Vertical connections don't always happen. For that reason the maze
// // is not always fully connected. This is a precaution/hack against
// // trying to render unconnected mazes. (It's a hack because auto-size
// // shouldn't be imported, and its functions shouldn't be copied into
// // this this one.
// function verifyConnections(maze, state, lines, charlist) {

//     function getMaxMazeWidth(mazeMargin, locationSize) {
//         var windowWidth = utils.windowWidth;
//         var max         = windowWidth * (1 - mazeMargin * 2);

//         return max - (max % locationSize);
//     }

//     for (var i = 0; i < charlist.length; i++) {

//         if (!charlist[i].connected) {

//             state.text = 'error! try again';

//             document.getElementById('maze-reset-ctrl').removeAttribute('disabled');

//             autoSize(state, getMaxMazeWidth);
//             lines = breakTextIntoLines(state.text, state.maxMazeWidth, state.locationSize);
//             padLines(lines, state.maxMazeWidth, state.locationSize);
//             maze.length = 0;
//             charlist.length = 0;
//             embedText(maze, charlist, lines);
//             connectCharacters(maze, charlist);

//             break;
//         }
//     }
// }

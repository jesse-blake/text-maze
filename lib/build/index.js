'use strict';

var breakTextIntoLines = require('./break-text-into-lines');
var embedText          = require('./embed-text');
var connectCharacters  = require('./connect-characters/index');

module.exports = function(text, maxMazeWidth, locationSize) {

    var lines = breakTextIntoLines(text, maxMazeWidth, locationSize);

    var maze = [];
    
    // List of Char objects for connecting characters, to complete the
    // maze build
    // Each character in the text is embeded in the maze, then pushed, with
    // its top-left coordinates in the maze, on to the charlist
    var charlist = [];

    embedText(maze, charlist, lines);

    connectCharacters(maze, charlist);

    return maze;
};

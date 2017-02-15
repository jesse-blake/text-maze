'use strict';

var breakTextIntoLines = require('./build-maze/break-text-into-lines');
var embedTextInMaze    = require('./build-maze/embed-text-in-maze');
var connectCharacters  = require('./build-maze/connect-characters');

module.exports = function(text, maxMazeWidth, componentSize) {

    var lines = breakTextIntoLines(text, maxMazeWidth, componentSize);

    var maze = [];
    
    // List of Char objects for connecting characters, to complete the
    // maze build
    // Each character in the text is embeded in the maze, then pushed, with
    // its top-left coordinates in the maze, on to the charlist
    var charlist = [];

    embedTextInMaze(maze, charlist, lines);

    connectCharacters(maze, charlist);

    return maze;
};

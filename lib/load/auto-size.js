'use strict';

var utils              = require('../utils');
var breakTextIntoLines = require('../build/break-text-into-lines');
var CharMaps           = require('../build/CharacterMaps');

// Set locationSize and maxMazeWidth to best fit the screen.
module.exports = function(state, getMaxMazeWidthCallback) {

    // Begin with the smallest location size, then test while increasing it.
    var locationSize = utils.minLocationSize;

    // Static max height.
    var maxMazeHeight = getMaxMazeHeight(locationSize);

    var maxMazeWidth  = getMaxMazeWidthCallback(locationSize);
    var lines = breakTextIntoLines(state.text, maxMazeWidth, locationSize);

    while (computeMazeHeight(lines, locationSize) <= maxMazeHeight) {
        locationSize++;

        maxMazeWidth = getMaxMazeWidthCallback(locationSize);
        lines = breakTextIntoLines(state.text, maxMazeWidth, locationSize);
    }

    // Location size is too big when the loop ends, so decrement it.
    state.locationSize = --locationSize;
    state.maxMazeWidth = getMaxMazeWidthCallback(locationSize);
};

// Returns the max height, which depends on the screen height and the margin size.
function getMaxMazeHeight(locationSize) {
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var margin       = 0.1;
    var max          = windowHeight * (1 - margin * 2);

    // The max height must be a multiple of the maze location size.
    return max - (max % locationSize);
}

// Returns the height the maze will be in pixels given the number of lines
// of text in the maze and the location size.
function computeMazeHeight(lines, locationSize) {
    var charHgt = CharMaps.getCharHeight(); 

    return locationSize * (charHgt * lines.length + lines.length + 1);
}

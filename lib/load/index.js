'use strict';

var utils    = require('../utils');
var autoSize = require('./auto-size');

// Load options/state, and the canvas context for maze rendering.
module.exports = {

    // Load user options and default state.
    opts: function(opts) {

        var state = {};

        loadText(opts, state);

        loadCurrentlyShowingText(opts, state);

        loadSizes(opts, state);

        loadEndpoints(state);

        loadSolveState(opts, state);

        // Wait a moment before rebuilding, when changing text or window size.
        state.changeTextRebuildTimeout = null;
        state.changeWindowSizeRebuildTimeout = null;

        return state;
    },

    // Load the canvas context for rendering the maze.
    canvas: function(maze, state) {
        var i, longest = 0;

        var canvas = document.getElementById('text-maze');

        if (!canvas.getContext) {
            throw Error("Cannot find a canvas tag with id of 'text-maze'.");
        }

        // Find the longest row in the maze.
        for (i = 0; i < maze.length; i++) {
            if (maze[i].length > longest) {
                longest = maze[i].length;
            }
        }

        canvas.width  = longest * state.locationSize;
        canvas.height = maze.length * state.locationSize;

        return canvas.getContext('2d');
    },

    setLocationSize: function(state, locationSize) {
        state.locationSize = locationSize;
        state.maxMazeWidth = getMaxMazeWidth(locationSize);
    },

    autoSetLocationSize: function(state) {
        autoSize(state, getMaxMazeWidth);
    }
};

function validateOpts(opts) {
    var i, o, optNames = ['text', 'locationSize', 'currentlyShowingText', 'animationDelay'];

    if (opts && typeof opts !== 'object') {
        throw new Error("Maze init requires an 'opts' object.");
    }

    for (o in opts) {
        // Don't check inherited properties.
        if (opts.hasOwnProperty(o)) {
            if (optNames.indexOf(o) < 0) {
                throw new Error("Unknown maze option: '" + o + "'");
            }
        }
    }
}

function loadText(opts, state) {
    if ('text' in opts) {
        if (typeof opts.text === 'string' && opts.text.length > 0) {
            state.text = opts.text;
            state.originalText = opts.text;
        }
        else {
            throw new Error("Maze option 'text' must be a non-empty string.");
        }
    }
    else {
        throw new Error("Maze option 'text' is required.");
    }
}

function loadCurrentlyShowingText(opts, state) {
    if ('currentlyShowingText' in opts) {
        if (typeof opts.currentlyShowingText === 'boolean') {
            state.currentlyShowingText = opts.currentlyShowingText;
        }
        else {
            throw new Error("Maze option 'currentlyShowingText' must be a boolean.");
        }
    }
    else {
        state.currentlyShowingText = false;
    }
}

function loadSizes(opts, state) {

    if ('locationSize' in opts) {
        if (Number.isInteger(opts.locationSize) && opts.locationSize >= utils.minLocationSize) {
            state.locationSize = opts.locationSize;
        }
        else {
            throw new Error("Maze option 'locationSize' must be an integer >= " + utils.minLocationSize + '.');
        }

        state.maxMazeWidth = getMaxMazeWidth(state.locationSize);
    }
    else {
        // Auto size the maze to fit the screen.
        autoSize(state, getMaxMazeWidth);
    }
}

function getMaxMazeWidth(locationSize) {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var margin      = 0.1;
    var max         = windowWidth * (1 - margin * 2);

    // The max width must be a multiple of the maze location size.
    return max - (max % locationSize);
}

function loadEndpoints(state) {
    state.endpoints = {
        start: { 'x': null, 'y': null },
        end:   { 'x': null, 'y': null }
    };
}

function loadSolveState(opts, state) {
    state.solve = {
        showingSolution: false,
        running:         false,
        interval:        null,
        prev:            null,
        curr:            { 'x': null, 'y': null },
        stack:           [],
        animationDelays: [1280, 640, 320, 160, 80, 40, 20, 10, 5, 0]
    };

    if ('animationDelay' in opts) {
        if (Number.isInteger(opts.animationDelay) && opts.animationDelay >= 0) {
            state.solve.delay = opts.animationDelay;
        }
        else {
            throw new Error("Maze option 'delay' must be an integer > 0.");
        }
    }
    else {
        state.solve.delay = state.solve.animationDelays[6];
    }
}

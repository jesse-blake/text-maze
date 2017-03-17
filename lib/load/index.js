'use strict';

var utils     = require('../utils');
var webColors = require('../paint/web-colors');
var autoSize  = require('./auto-size');

// Load options/state, and the canvas context for maze rendering.
module.exports = {

    // Load user options and default state.
    state: function(opts) {

        var state = {};

        state.mazeMargin = 0.1;

        loadText(opts, state);

        loadBooleanOpts(opts, state);

        // Auto size the maze to fit the screen.
        autoSize(state, getMaxMazeWidth);

        loadEndpoints(state);

        loadSolveState(opts, state);

        loadColors(opts, state);

        // For waiting a moment before rebuilding when changing text or window size.
        state.changeTextRebuildTimeout = null;
        state.changeWindowSizeRebuildTimeout = null;

        return state;
    },

    // Load the canvas context for rendering the maze.
    canvas: function(maze, state) {
        return loadCanvas(maze, state);
    },

    setLocationSize: function(state, locationSize) {
        state.locationSize = locationSize;
        state.maxMazeWidth = getMaxMazeWidth(state.mazeMargin, state.locationSize);
    },

    autoSetLocationSize: function(state) {
        autoSize(state, getMaxMazeWidth);
    }
};

function validateOpts(opts) {
    var i, o, optNames = ['text', 'currentlyShowingText', 'colors', 'useSpeedMeter'];

    if (opts && typeof opts !== 'object') {
        throw new Error("Maze init requires an 'opts' object");
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
            throw new Error("Maze option 'text' must be a non-empty string");
        }
    }
    else {
        throw new Error("Maze option 'text' is required");
    }
}

function loadBooleanOpts(opts, state) {
    var o;

    state.currentlyShowingText = false;
    state.useSpeedMeter = false;

    for (o in opts) {
        if (o === 'currentlyShowingText' || o === 'useSpeedMeter') {
            if (typeof opts[o] === 'boolean') {
                state[o] = opts[o];
            }
            else {
                throw new Error("Maze option '" + o + "' must be a boolean");
            }
        }
    }
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
        delay:           40,
        animationDelays: [640, 320, 160, 80, 40, 20, 10, 5, 0],
        get speed() {
            return this.animationDelays.indexOf(this.delay) + 1;
        },
        set speed(spd) {
            if (spd < 1 || spd > this.animationDelays.length) {
                throw new Error('Invalid solve speed: ' + spd);
            }
            this.delay = this.animationDelays[spd - 1];
        }
    };
}

function loadColors(opts, state) {
    var o;

    state.colors = {
        text:        'deepskyblue',
        solution:    'orange',
        backtracked: 'lightgray',
        unvisited:   'white',
        fluctuate:   true,
        randomize:   false
    };

    if ('colors' in opts) {
        for (o in opts.colors) {
            switch (o) {

                // Text and solution-line color.
                case 'text':
                case 'solution':
                    if (webColors.hsl(opts.colors[o])) {
                        state.colors[o] = opts.colors[o];
                    }
                    else {
                        throw new Error("Invalid value '" + opts.colors[o] + "' for maze color option '" + o + "'");
                    }
                    break;

                // Fluctuate the color hue a little when painting incremental parts.
                case 'fluctuate':
                // Choose a random web color for the text and solution.
                case 'randomize':
                    if (typeof opts.colors[o] === 'boolean') {
                        state.colors[o] = opts.colors[o];
                    }
                    else {
                        throw new Error("Maze color option '" + o + "' must be a boolean");
                    }
                    break;

                default:
                    throw new Error("Invalid maze color option '" + o + "'");
            }
        }
    }
}

function loadCanvas(maze, state) {
    var i, longest = 0;

    var canvas = document.getElementById('text-maze');

    if (!canvas) {
        throw Error("Cannot find a canvas tag with id of 'text-maze'");
    }

    if (!canvas.getContext) {
        throw Error("Canvas getContext property does not exist");
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
}

function getMaxMazeWidth(mazeMargin, locationSize) {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var max         = windowWidth * (1 - mazeMargin * 2);

    // The max width must be a multiple of the maze location size.
    return max - (max % locationSize);
}

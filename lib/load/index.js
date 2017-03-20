'use strict';

var utils     = require('../utils');
var webColors = require('../paint/web-colors');
var autoSize  = require('./auto-size');

// Load maze state/options, and the canvas context for maze rendering.
module.exports = {

    // Get the app's main state object with default and optionally-configured values.
    state: function(opts) {
        var state = loadOptions(getDefaults(), opts);

        autoSize(state, getMaxMazeWidth);

        return Object.seal(state);
    },

    // Initialize the html canvas.
    canvas: function(maze, state) {
        return loadCanvas(maze, state);
    },

    // Helper for loading state before rebuilding the maze with a different location size.
    setLocationSize: function(state, locationSize) {
        state.locationSize = locationSize;
        state.maxMazeWidth = getMaxMazeWidth(state.mazeMargin, state.locationSize);
    },

    // Helper for loading state before rebuilding the maze with a different location size.
    autoSetLocationSize: function(state) {
        autoSize(state, getMaxMazeWidth);
    }
};

function getDefaults() {
    return {
        text:         'Hope means hoping when things are hopeless, or it is no virtue at all. G.K.C.',
        originalText: 'Hope means hoping when things are hopeless, or it is no virtue at all. G.K.C.',
        currentlyShowingText: false,

        // Speed meter is designed to be rendered in a bootstrap css btn-group class.
        useSpeedMeter: false,

        // Minimum margin rendered between screen edges and the maze.
        mazeMargin: 0.1,

        // Timeouts to keep from immediately rebuilding on text change or screen resize.
        textChangeRebuildTimeout: null,
        screenChangeRebuildTimeout: null,

        // Size parameters set by the auto-size module.
        locationSize: null,
        autoFittedLocationSize: null,
        maxMazeWidth: null,

        // Maze start and end.
        endpoints: {
            start: {
                'x': null,
                'y': null
            },
            end: {
                'x': null,
                'y': null
            }
        },

        // Rendering/painting colors.
        colors: {
            text:        'black',
            solution:    'black',
            backtracked: 'lightgray',
            unvisited:   'white',
            randomize:   false,
            fluctuate:   false
        },

        // State used to show the solution and auto-solve the maze.
        solve: {
            showingSolution: false,
            running:         false,

            // Locations in the maze while solving.
            prev:            null,
            curr:            { 'x': null, 'y': null },
            stack:           [],

            // Interval timing parameters for animating finding the maze solution.
            interval:        null,
            delay:           40,
            animationDelays: [640, 320, 160, 80, 40, 20, 10, 5, 0],
            get speed() {
                // The speed is one more than the index of the current animation delay.
                return this.animationDelays.indexOf(this.delay) + 1;
            },
            set speed(spd) {
                if (spd < 1 || spd > this.animationDelays.length) {
                    throw new Error('Invalid solve speed: ' + spd);
                }
                this.delay = this.animationDelays[spd - 1];
            }
        }
    };
}

// Load optional user-defined configuration.
function loadOptions(state, opts) {
    var o, co;

    if (opts && typeof opts !== 'object') {
        throw new Error("Maze init requires an 'opts' object");
    }

    for (o in opts) {
        if (opts.hasOwnProperty(o)) {
            switch (o) {

                case 'text':
                    if (typeof opts.text === 'string' && opts.text.length > 0) {
                        state.text         = opts.text;
                        state.originalText = opts.text;
                    }
                    else {
                        throw new Error("Maze option 'text' must be a non-empty string");
                    }
                    break;

                case 'currentlyShowingText':
                case 'useSpeedMeter':
                    if (typeof opts[o] === 'boolean') {
                        state[o] = opts[o];
                    }
                    else {
                        throw new Error("Maze option '" + o + "' must be a boolean");
                    }
                    break;

                case 'colors':
                    if (typeof opts.colors === 'object') {
                        for (co in opts.colors) {
                            switch (co) {

                                case 'text':
                                case 'solution':
                                    if (webColors.hsl(opts.colors[co])) {
                                        state.colors[co] = opts.colors[co];
                                    }
                                    else {
                                        throw new Error("Invalid value '" + opts.colors[co] + "' for maze color option '" + co + "' (must be a web color name)");
                                    }
                                    break;

                                case 'fluctuate':
                                case 'randomize':
                                    if (typeof opts.colors[co] === 'boolean') {
                                        state.colors[co] = opts.colors[co];
                                    }
                                    else {
                                        throw new Error("Maze color option '" + co + "' must be a boolean");
                                    }
                                    break;

                                default:
                                    throw new Error("Invalid maze color option '" + co + "'");
                            }
                        }
                    }
                    break;

                default:
                    throw new Error("Unknown maze option: '" + o + "'");
            }
        }
    }

    return state;
}

// Sets the canvas element's size and gets its context for rendering the maze.
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

// Returns the maximum width the maze can be based on the screen size and maze margin.
function getMaxMazeWidth(mazeMargin, locationSize) {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var max         = windowWidth * (1 - mazeMargin * 2);

    // The max width must be a multiple of the maze location size.
    return max - (max % locationSize);
}

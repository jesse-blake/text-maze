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

        currentlyShowingText:     true,
        currentlyShowingSolution: true,

        // Speed meter is designed to be rendered in a bootstrap css btn-group class.
        useSpeedMeter: false,

        // Minimum margin rendered between screen edges and the maze.
        // 576 is Bootstrap's xs breakpoint.
        get mazeMargin() {
            return utils.windowWidth <= 576 ? 0.05 : 0.1;
        },

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
            text:                   'black',
            textDefault:            'black',
            solution:               'chartreuse',
            solutionDefault:        'chartreuse',
            backtracked:            'lightgray',
            unvisited:              'white',
            randomizeTextColor:     false,
            fluctuateTextColor:     false,
            randomizeSolutionColor: false,
            fluctuateSolutionColor: false,
        },

        // State used to show the solution and auto-solve the maze.
        solve: {
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

                // Text option must be a string.
                case 'text':
                    if (typeof opts.text === 'string' && opts.text.length > 0) {
                        state[o] = opts[o];
                        state.originalText = opts.text;
                    }
                    else {
                        throw new Error("Maze option '" + o + "' must be a non-zero-length string");
                    }
                    break;

                // Options that must be a boolean.
                case 'currentlyShowingText':
                case 'currentlyShowingSolution':
                case 'useSpeedMeter':
                    if (typeof opts[o] === 'boolean') {
                        state[o] = opts[o];
                    }
                    else {
                        throw new Error("Maze option '" + o + "' must be a boolean");
                    }
                    break;

                // Color options that must be a boolean.
                case 'fluctuateTextColor':
                case 'randomizeTextColor':
                case 'fluctuateSolutionColor':
                case 'randomizeSolutionColor':
                    if (typeof opts[o] === 'boolean') {
                        state.colors[o] = opts[o];
                    }
                    else {
                        throw new Error("Maze option '" + o + "' must be a boolean");
                    }
                    break;

                // Optional colors must be web colors.
                case 'textColor':
                case 'solutionColor':
                    if (webColors.hsl(opts[o])) {
                        if (o === 'textColor') {
                            state.colors.text        = opts[o];
                            state.colors.textDefault = opts[o];
                        }
                        else {
                            state.colors.solution        = opts[o];
                            state.colors.solutionDefault = opts[o];
                        }
                    }
                    else {
                        throw new Error("Invalid value '" + opts[o] + "' for maze color option '" + o + "' (must be a web color name)");
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
    var windowWidth = utils.windowWidth;
    var max         = windowWidth * (1 - mazeMargin * 2);

    // The max width must be a multiple of the maze location size.
    return max - (max % locationSize);
}

'use strict';

// Load options/state, and the canvas context for maze rendering.
module.exports = {

    // Load user options and default state.
    opts: function(text, opts) {

        opts = typeof opts === 'object' ? opts : {};

        var state = {};

        // Set the maze's text.
        if (text) {
            if (typeof text && typeof text === 'string') {
                state.text = text;
            }
            else {
                throw new Error('Maze text must be a non-empty string.');
            }
        }
        else {
            state.text = 'default maze text';
        }

        // Set showText option.
        if ('showText' in opts) {
            if (typeof opts.showText === 'boolean') {
                state.showText = opts.showText;
            }
            else {
                throw new Error('Option showText must be a boolean.');
            }
        }
        else {
            state.showText = false;
        }

        // Set the locationSize option.
        if ('locationSize' in opts) {
            if (typeof opts.locationSize === 'number') {
                state.locationSize = opts.locationSize;
            }
            else {
                throw new Error('Option locationSize must be a number.');
            }
        }
        else {
            state.locationSize = 10;
        }

        state.maxMazeWidth = setMaxMazeWidth(state);

        state.endpoints = {
            start: {
                'x':null,
                'y':null
            },
            end: {
                'x': null,
                'y': null
            }
        };

        state.solve = {
            running         : false,
            showingSolution : false,
            interval        : null,
            stack           : [],
            prev            : null,
            curr            : { 'x': null, 'y': null }
        };

        // Set the solver animation delay option.
        if ('delay' in opts) {
            if (typeof opts.delay === 'number') {
                state.solve.delay = opts.delay;
            }
            else {
                throw new Error('Option delay must be a number.');
            }
        }
        else {
            state.solve.delay = 10;
        }

        // Canvas must still be loaded into state, after maze is built.

        return state;
    },

    // Load the canvas context for rendering the maze.
    canvas: function(maze, state) {
        var i, max = 0;

        var canvas = document.getElementById('text-maze');

        if (!canvas.getContext) {
            throw Error("Cannot find a canvas tag with id of 'text-maze'.");
        }

        // Find the longest row in the maze.
        for (i = 0; i < maze.length; i++) {
            if (maze[i].length > max) {
                max = maze[i].length;
            }
        }

        canvas.width  = max * state.locationSize;
        canvas.height = maze.length * state.locationSize;

        return canvas.getContext('2d');
    }
};

// Width is chosen so that a margin around the maze is left in the screen, assuming
// the maze will be centered in the window with css.
function setMaxMazeWidth(state) {
    var largeScreenSize   = 1000,
        largeScreenOffset = 100,
        smallScreenOffset = 30,
        maxWidth          = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // The max width must be a multiple of the maze location size.
    if (maxWidth % state.locationSize !== 0) {
        maxWidth = maxWidth - (maxWidth % state.locationSize);
    }

    return maxWidth < largeScreenSize ? maxWidth - smallScreenOffset : maxWidth - largeScreenOffset;
}

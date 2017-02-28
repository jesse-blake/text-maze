'use strict';

var build  = require('./build/index');
var paint  = require('./paint');
var listen = require('./listen');

module.exports = {

    init: function(text) {
        var defaultText = "Here's something very special for you to say with your whole heart... Our Father, Who art in Heaven, hallowed be Thy Name! Thy Kingdom come, Thy will be done, on earth as it is in Heaven. Give us this day our daily bread, and forgive us our trespasses as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. Amen!";

        this.showText = false;

        // Set default text if none provided.
        this.text = (typeof text === 'string' && text.length > 0) ? text : defaultText;

        // Each square rendered in the maze is a location.
        this.locationSize = 8;

        this.endpoints = {
            start: {
                'x': null,
                'y': null
            },
            end: {
                'x': null,
                'y': null
            }
        };

        this.maxMazeWidth = this.setMaxMazeWidth();

        // Build a 2d array representing the maze.
        this.maze = build(this);

        // Canvas tag's context for rendering.
        this.canvasContext = this.getCanvas(this.getMazeWidth() * this.locationSize, this.maze.length * this.locationSize);

        // State for the solve module.
        this.solve = {
            running: false,
            delay: 3,
            curr: {
                'x': this.endpoints.start.x,
                'y': this.endpoints.start.y
            },
            prev: null,
            stack: [],
            interval: null,
            canvasContext: this.canvasContext
        };

        // Paint the maze on the canvas tag.
        paint.all(this);

        listen(this);
    },

    // Width is chosen so that a margin around the maze is left in the screen, assuming
    // the maze will be centered in the window with css.
    setMaxMazeWidth: function() {
        var largeScreenSize   = 1000,
            largeScreenOffset = 100,
            smallScreenOffset = 30,
            maxWidth          = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // The max width must be a multiple of the maze location size.
        if (maxWidth % this.locationSize !== 0) {
            maxWidth = maxWidth - (maxWidth % this.locationSize);
        }

        return maxWidth < largeScreenSize ? maxWidth - smallScreenOffset : maxWidth - largeScreenOffset;
    },

    // Returns the length of the longest row in the maze (in number of maze locations).
    getMazeWidth: function() {
        var i, longestRow = 0;

        for (i = 0; i < this.maze.length; i++) {
            if (this.maze[i].length > longestRow) {
                longestRow = this.maze[i].length;
            }
        }

        return longestRow;
    },

    // Get the html canvas element used to render the maze.
    getCanvas: function(width, height) {
        var context, canvas = document.getElementById('text-maze');

        if (!canvas.getContext) {
            throw Error("Cannot find a canvas tag with id of 'text-maze'.");
        }

        canvas.width = width;
        canvas.height = height;

        return canvas.getContext('2d');
    }
};

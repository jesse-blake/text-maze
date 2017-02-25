'use strict';

var build  = require('./build/index');
var paint  = require('./paint');
var listen = require('./listen');

module.exports = {

    init: function(text) {
        var defaultText = "Here's something very special for you to say with your whole heart... Our Father, Who art in Heaven, hallowed be Thy Name! Thy Kingdom come, Thy will be done, on earth as it is in Heaven. Give us this day our daily bread, and forgive us our trespasses as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. Amen!";

        this.showText = true;

        // Set default text if none provided.
        this.text = (typeof text === 'string' && text.length > 0) ? text : defaultText;

        // Each square rendered in the maze is a location.
        this.locationSize = 8;

        this.solverDelay = 0;
        this.solverInterval = null;

        this.maxMazeWidth = this.setMaxMazeWidth();

        // Build a 2d array representing the maze.
        this.maze = build(this.text, this.maxMazeWidth, this.locationSize);

        // Simplify the maze to make it easier to work with.
        this.maze = this.flattenMaze();

        // Canvas tag's context for rendering.
        this.canvasContext = this.getCanvas(this.getMazeWidth() * this.locationSize, this.maze.length * this.locationSize);

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

    flattenMaze: function() {
        var x, y, flattened = [];

        for (y = 0; y < this.maze.length; y++) {

            flattened.push([]);

            for (x = 0; x < this.maze[y].length; x++) {
                flattened[y].push(this.maze[y][x].flattenCharacter(x, y));
            }
        }

        return flattened;
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

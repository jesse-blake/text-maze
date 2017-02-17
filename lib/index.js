'use strict';

var $          = require('jquery');
var buildMaze  = require('./build-maze');
var getCanvas  = require('./get-canvas');
var renderMaze = require('./render-maze');

module.exports = {

    init: function(text) {
        var defaultText = "Here's something very special for you to say with your whole heart... Our Father, Who art in Heaven, hallowed be Thy Name! Thy Kingdom come, Thy will be done, on earth as it is in Heaven. Give us this day our daily bread, and forgive us our trespasses as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. Amen!";

        // Set default text if none provided
        this.text = (typeof text === 'string' && text.length > 0) ? text : defaultText;

        // Each square rendered in the maze is a location
        this.locationSize = 10;

        this.maxMazeWidth = this.setMaxMazeWidth();

        // Build a 2d array representing the maze
        this.maze = buildMaze(this.text, this.maxMazeWidth, this.locationSize);

        // Canvas tag's context for rendering
        this.canvasContext = getCanvas(this.getMazeWidth() * this.locationSize, this.maze.length * this.locationSize);

        renderMaze(this.maze, this.locationSize, this.canvasContext);
    },

    setMaxMazeWidth: function() {
        var largeScreenSize   = 1000,
            largeScreenOffset = 100,
            smallScreenOffset = 30,
            maxWidth          = $(window).width();

        // The max width must be a multiple of the maze location size
        if (maxWidth % this.locationSize !== 0) {
            maxWidth = maxWidth - (maxWidth % this.locationSize);
        }

        return maxWidth < largeScreenSize ? maxWidth - smallScreenOffset : maxWidth - largeScreenOffset;
    },

    // Returns the length of the longest row in the maze (in number of maze locations)
    getMazeWidth: function() {
        var i, longestRow = 0;

        for (i = 0; i < this.maze.length; i++) {
            if (this.maze[i].length > longestRow) {
                longestRow = this.maze[i].length;
            }
        }

        return longestRow;
    }

};

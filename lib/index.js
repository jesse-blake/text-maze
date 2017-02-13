'use strict';

var $          = require('jquery');
var buildMaze  = require('./build-maze');
var getCanvas  = require('./get-canvas');
var renderMaze = require('./render-maze');

module.exports = {

    init: function(text) {
        var defaultText = "Hail Mary, Full of Grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.";

        // Set default text if none provided
        this.text = (typeof text === 'string' && text.length > 0) ? text : defaultText;

        // Each square rendered in the maze is a component
        this.componentSize = 10;

        this.maxMazeWidth = this.setMaxMazeWidth();

        // Build a 2d array representing the maze
        this.maze = buildMaze(this.text, this.maxMazeWidth, this.componentSize);

        // Canvas tag's context for rendering
        this.canvasContext = getCanvas(1000, 1000);

        renderMaze(this.maze, this.componentSize, this.canvasContext);
    },

    setMaxMazeWidth: function() {
        var largeScreenSize   = 1000,
            largeScreenOffset = 100,
            smallScreenOffset = 30,
            maxWidth          = $(window).width();

        // The max width must be a multiple of the maze component size
        if (maxWidth % this.componentSize !== 0) {
            maxWidth = maxWidth - (maxWidth % this.componentSize);
        }

        return maxWidth < largeScreenSize ? maxWidth - smallScreenOffset : maxWidth - largeScreenOffset;
    }

};

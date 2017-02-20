'use strict';

module.exports = {

    // Global indication for a connected/unconnected location in the maze.
    unconnected: 0,
    connected: 1,

    // Global maze colors.
    colors: {
        connectedDark:  'black',
        connectedLight: '#888',
        unconnected:    '#ddd'
    },

    paintMazeLocation: function(canvasContext, color, x, y, size) {
        canvasContext.fillStyle = color; 
        canvasContext.fillRect(x, y, size-1, size-1);
    },

    // Shuffles the contents of an array in place.
    shuffleArrayInPlace: function(arr) {
        var i, rnd, tmp;

        for (i = arr.length; i; i--) {

            rnd = Math.floor(Math.random() * i);

            tmp = arr[i-1];
            arr[i-1] = arr[rnd];
            arr[rnd] = tmp;
        }

        return;
    },

    // Returns a number in range [min, max].
    randomInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

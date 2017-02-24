'use strict';

module.exports = {

    yes: 1,
    no: 0,

    getCanvasContext: function() {
        return document.getElementById('text-maze').getContext('2d');
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

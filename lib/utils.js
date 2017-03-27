'use strict';

module.exports = {

    // The smallest size that looks good with the way borders are currently drawn.
    minLocationSize: 5,

    // TODO A better vertical character connection algorithm so this hack isn't necessary.
    maxLocationSize: function(state) {
        return state.autoFittedLocationSize + 10;
    },

    get windowHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },

    get windowWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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

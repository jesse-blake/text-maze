'use strict';

// Shuffle an array in place.
module.exports = function(arr) {
    var rnd, tmp;

    for (let i = arr.length; i; i--) {

        rnd = Math.floor(Math.random() * i);

        tmp = arr[i - 1];
        arr[i - 1] = arr[rnd];
        arr[rnd] = tmp;
    }
};

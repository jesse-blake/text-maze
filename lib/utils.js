'use strict';

module.exports = {

    shuffleArrayInPlace: function(arr) {
        var i, rnd, tmp;

        for (i = arr.length; i; i--) {

            rnd = Math.floor(Math.random() * i);

            tmp = arr[i-1];
            arr[i-1] = arr[rnd];
            arr[rnd] = tmp;
        }
    }
};

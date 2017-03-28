'use strict';

// Polyfill ES6 features.
(function () {

    // Number.isInteger
    // https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch2.md
    if (!Number.isInteger) {
        Number.isInteger = function(num) {
            return typeof num === 'number' && num % 1 === 0;
        };
    }
})();

// Polyfill some newer features.
(function () {

    // Number.isInteger
    // https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch2.md
    if (!Number.isInteger) {
        Number.isInteger = function(num) {
            return typeof num === 'number' && num % 1 === 0;
        };
    }

    // Array.indexOf
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
            var k;
            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = fromIndex | 0;
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in o && o[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
})();

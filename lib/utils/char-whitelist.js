'use strict';

module.exports = function() {

    // Hyphens are added to the text when the text is hyphenated, but not otherwise allowed.
    // Not using regex char classes so this can be expanded into individual chars for testing.
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .?!\'';
};

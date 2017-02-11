'use strict';

var $ = require('jquery');

module.exports = function(width, height) {
    var context, canvas = $('#text-maze')[0];

    if (!canvas.getContext) {
        throw Error("Cannot find a canvas tag with id of 'text-maze'.");
    }

    canvas.width = width;
    canvas.height = height;

    return canvas.getContext('2d');
};

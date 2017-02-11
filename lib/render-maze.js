'use strict';

var compPainter = require('./component-painter');

module.exports = function(components, componentSize, canvasContext) {
    var x, y, color;

    for (y = 0; y < components.length; y++) {
        for (x = 0; x < components[y].length; x++) {

            color = components[y][x].onPath ? 'black' : 'lightgray';

            compPainter(canvasContext, color, x * componentSize, y * componentSize, componentSize);
        }
    }
};

'use strict';

module.exports = function(canvasContext, color, x, y, size) {
    canvasContext.fillStyle = color; 
    canvasContext.fillRect(x, y, size-1, size-1);
};

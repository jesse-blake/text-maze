'use strict';

var utils = require('./utils');

// For miscellaneous view modifications.
module.exports = {

    setMazeTopMargin: function(mazeMargin) {
        var windowHeight = utils.windowHeight;
        var mazeMenu     = document.getElementById('maze-menu');

        document.getElementById('text-maze').style.marginTop = ((windowHeight - mazeMenu.scrollHeight) * mazeMargin / 2) + 'px';
    }
};

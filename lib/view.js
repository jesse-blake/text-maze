'use strict';

// For miscellaneous view modifications.
module.exports = {

    setMazeTopMargin: function(mazeMargin) {
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var mazeMenu     = document.getElementById('maze-menu');

        document.getElementById('text-maze').style.marginTop = ((windowHeight - mazeMenu.scrollHeight) * mazeMargin / 2) + 'px';
    }
};

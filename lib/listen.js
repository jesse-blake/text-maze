'use strict';

var utils  = require('./utils');
var paint = require('./paint');
var solve  = require('./solve');

// Add event listeners to the maze controls.
module.exports = function(app) {

    var textToggle = document.getElementById('toggle-maze-text');
    var autoSolve  = document.getElementById('auto-solve-maze');

    // Show and hide the maze's embedded text.
    if (textToggle) {
        textToggle.addEventListener('click', function(evt) {
            app.showText = !app.showText;
            this.innerHTML = app.showText ? 'Hide Text' : 'Show Text';
            paint.all(app);
            stopDefault(evt);
        }, false);
    }

    // Start and stop auto-solving the maze.
    if (autoSolve) {
        autoSolve.addEventListener('click', function(evt) {
            if (app.solving) {
                solve.stop(app, this);
            }
            else {
                solve.start(app, this);
            }
            stopDefault(evt);
        }, false);
    }
};

// Prevent the browser's default action for clicked element.
function stopDefault(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
}

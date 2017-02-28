'use strict';

var controls = require('./controls');
var paint    = require('./paint');
var solve    = require('./solve');

// Add event listeners to the maze controls.
module.exports = function(app) {

    var mazeTextCtrl       = document.getElementById('maze-text-ctrl');
    var solveMazeCtrl      = document.getElementById('solve-maze-ctrl');
    var solveMazeResetCtrl = document.getElementById('solve-maze-reset-ctrl');

    // Show and hide the maze's embedded text.
    if (mazeTextCtrl) {
        mazeTextCtrl.addEventListener('click', function(evt) {

            app.showText = !app.showText;
            if (app.showText) {
                controls.updateCtrlText('maze-text-ctrl', 'Hide Text');
            }
            else {
                controls.updateCtrlText('maze-text-ctrl', 'Show Text');
            }
            paint.all(app);
            stopDefault(evt);

        }, false);
    }

    // Run the solve module from the current state.
    if (solveMazeCtrl) {
        solveMazeCtrl.addEventListener('click', function(evt) {

            solve(app, false);
            stopDefault(evt);

        }, false);
    }

    // Reset the solve module.
    if (solveMazeResetCtrl) {
        solveMazeResetCtrl.addEventListener('click', function(evt) {

            solve(app, true);
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

'use strict';

var controls = require('./controls');
var paint    = require('./paint');
var solve    = require('./solve');
var build    = require('./build/index');

// Add event listeners to the maze controls.
module.exports = function(maze, canvas, state) {

    var mazeTextCtrl         = document.getElementById('maze-text-ctrl');
    var solveMazeCtrl        = document.getElementById('solve-maze-ctrl');
    var solveMazeResetCtrl   = document.getElementById('solve-maze-reset-ctrl');
    var showMazeSolutionCtrl = document.getElementById('show-maze-solution-ctrl');
    var rebuildMazeCtrl      = document.getElementById('rebuild-maze-ctrl');

    // Show and hide the maze's embedded text.
    if (mazeTextCtrl) {
        mazeTextCtrl.addEventListener('click', function(evt) {

            state.currentlyShowingText = !state.currentlyShowingText;
            if (state.currentlyShowingText) {
                controls.updateCtrlText('maze-text-ctrl', 'Hide Text');
            }
            else {
                controls.updateCtrlText('maze-text-ctrl', 'Show Text');
            }
            paint.all(maze, canvas, state);
            stopDefault(evt);

        }, false);
    }

    // Run the solve module from its current state.
    if (solveMazeCtrl) {
        solveMazeCtrl.addEventListener('click', function(evt) {

            solve.run(maze, canvas, state, false);
            stopDefault(evt);

        }, false);
    }

    // Reset the solve module.
    if (solveMazeResetCtrl) {
        solveMazeResetCtrl.addEventListener('click', function(evt) {

            solve.run(maze, canvas, state, true);
            stopDefault(evt);

        }, false);
    }

    // Display the solution.
    if (showMazeSolutionCtrl) {
        showMazeSolutionCtrl.addEventListener('click', function(evt) {

            solve.show(maze, canvas, state);
            stopDefault(evt);

        }, false);
    }

    // Build a new maze.
    if (rebuildMazeCtrl) {
        rebuildMazeCtrl.addEventListener('click', function(evt) {

            // First reset the solve module's state.
            solve.run(maze, canvas, state, true);

            maze = build(state);
            paint.all(maze, canvas, state);
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

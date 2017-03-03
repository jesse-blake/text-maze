'use strict';

var utils    = require('./utils');
var controls = require('./controls');
var paint    = require('./paint');
var solve    = require('./solve');
var build    = require('./build/index');
var load     = require('./load/index');

// Add event listeners to the maze controls.
module.exports = function(maze, canvas, state) {

    var mazeTextCtrl         = document.getElementById('maze-text-ctrl');
    var solveMazeCtrl        = document.getElementById('solve-maze-ctrl');
    var solveMazeResetCtrl   = document.getElementById('solve-maze-reset-ctrl');
    var showMazeSolutionCtrl = document.getElementById('show-maze-solution-ctrl');
    var rebuildMazeCtrl      = document.getElementById('rebuild-maze-ctrl');
    var autoSizeCtrl         = document.getElementById('auto-size-ctrl');
    var increaseSizeCtrl     = document.getElementById('increase-size-ctrl');
    var decreaseSizeCtrl     = document.getElementById('decrease-size-ctrl');

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

    if (autoSizeCtrl) {
        autoSizeCtrl.addEventListener('click', function(evt) {

            // First reset the solve module's state.
            solve.run(maze, canvas, state, true);

            load.autoSetLocationSize(state);
            maze = build(state);
            load.canvas(maze, state);
            paint.all(maze, canvas, state);

            stopDefault(evt);

        }, false);
    }

    if (increaseSizeCtrl) {
        increaseSizeCtrl.addEventListener('click', function(evt) {

            // TODO This is a hack. Vertical connections sometimes don't work
            // so sometimes at large location sizes when only a few characters
            // are on a line, there's not way to connect lines. So make sure
            // characters can always be connected vertically. In other words,
            // don't use a magic number to force line length. Or make sure the
            // maze has a solution after building it anew. Or make sure it has
            // a solution after increasing location size.
            if ((state.locationSize + 1) * 33 < state.maxMazeWidth) {

                // First reset the solve module's state.
                solve.run(maze, canvas, state, true);

                load.setLocationSize(state, state.locationSize + 1);
                maze = build(state);
                load.canvas(maze, state);
                paint.all(maze, canvas, state);
            }

            stopDefault(evt);

        }, false);
    }

    if (decreaseSizeCtrl) {
        decreaseSizeCtrl.addEventListener('click', function(evt) {

            if (state.locationSize - 1 >= utils.minLocationSize) {

                // First reset the solve module's state.
                solve.run(maze, canvas, state, true);

                load.setLocationSize(state, state.locationSize - 1);
                maze = build(state);
                load.canvas(maze, state);
                paint.all(maze, canvas, state);
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

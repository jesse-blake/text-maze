'use strict';

var utils    = require('./utils');
var controls = require('./controls');
var paint    = require('./paint');
var solve    = require('./solve');
var build    = require('./build/index');
var load     = require('./load/index');

// Add event listeners to the maze controls.
module.exports = function(maze, canvas, state) {

    var mazeRebuildCtrl       = document.getElementById('maze-rebuild-ctrl');
    var mazeShowTextCtrl      = document.getElementById('maze-show-text-ctrl');
    var mazeShowSolutionCtrl  = document.getElementById('maze-show-solution-ctrl');
    var mazeSolveCtrl         = document.getElementById('maze-solve-ctrl');
    var mazeSolveResetCtrl    = document.getElementById('maze-solve-reset-ctrl');
    var mazeDecreaseSpeedCtrl = document.getElementById('maze-decrease-speed-ctrl');
    var mazeCurrentSpeed      = document.getElementById('maze-current-speed');
    var mazeIncreaseSpeedCtrl = document.getElementById('maze-increase-speed-ctrl');
    var mazeDecreaseSizeCtrl  = document.getElementById('maze-decrease-size-ctrl');
    var mazeAutoSizeCtrl      = document.getElementById('maze-auto-size-ctrl');
    var mazeIncreaseSizeCtrl  = document.getElementById('maze-increase-size-ctrl');

    var animationDelays       = [1280, 640, 320, 160, 80, 40, 20, 10, 5, 0];

    // Build a new maze.
    if (mazeRebuildCtrl) {
        mazeRebuildCtrl.addEventListener('click', function(evt) {

            // First reset the solve module's state.
            solve.run(maze, canvas, state, true);

            maze = build(state);
            paint.all(maze, canvas, state);

            stopDefault(evt);

        }, false);
    }

    // Show and hide the maze's embedded text.
    if (mazeShowTextCtrl) {
        mazeShowTextCtrl.addEventListener('click', function(evt) {

            state.currentlyShowingText = !state.currentlyShowingText;
            if (state.currentlyShowingText) {
                controls.updateCtrlText('maze-show-text-ctrl', 'Hide Text');
            }
            else {
                controls.updateCtrlText('maze-show-text-ctrl', 'Show Text');
            }
            paint.all(maze, canvas, state);
            stopDefault(evt);

        }, false);
    }

    // Display the solution.
    if (mazeShowSolutionCtrl) {
        mazeShowSolutionCtrl.addEventListener('click', function(evt) {

            solve.show(maze, canvas, state);
            stopDefault(evt);

        }, false);
    }

    // Run the solve module from its current state.
    if (mazeSolveCtrl) {
        mazeSolveCtrl.addEventListener('click', function(evt) {

            solve.run(maze, canvas, state, false);
            stopDefault(evt);

        }, false);
    }

    // Reset the solve module.
    if (mazeSolveResetCtrl) {
        mazeSolveResetCtrl.addEventListener('click', function(evt) {

            solve.run(maze, canvas, state, true);
            stopDefault(evt);

        }, false);
    }

    // Decrease the speed of the solve animation.
    if (mazeDecreaseSpeedCtrl) {
        mazeDecreaseSpeedCtrl.addEventListener('click', function(evt) {

            // Solve speeds are one more than the index of the current animation delay.
            var solveSpeed = parseInt(mazeCurrentSpeed.innerHTML);

            if (solveSpeed > 1) {

                // Stop solving, set speed, then continue solving, if solve
                // is currently running.
                if (state.solve.running) {
                    solve.run(maze, canvas, state);
                    mazeCurrentSpeed.innerHTML = solveSpeed - 1;
                    state.solve.animationDelay = animationDelays[solveSpeed - 2];
                    solve.run(maze, canvas, state);
                }
                else {
                    mazeCurrentSpeed.innerHTML = solveSpeed - 1;
                    state.solve.animationDelay = animationDelays[solveSpeed - 2];
                }
            }

            stopDefault(evt);

        }, false);
    }

    // Display the default solve speed.
    if (mazeCurrentSpeed) {
        mazeCurrentSpeed.innerHTML = animationDelays.indexOf(state.solve.animationDelay) + 1;
    }

    // Increase the speed of the solve animation.
    if (mazeIncreaseSpeedCtrl) {
        mazeIncreaseSpeedCtrl.addEventListener('click', function(evt) {

            // Solve speeds are one more than the index of the current animation delay.
            var solveSpeed = parseInt(mazeCurrentSpeed.innerHTML);

            if (solveSpeed < animationDelays.length) {

                // Stop solving, set speed, then continue solving, if solve
                // is currently running.
                if (state.solve.running) {
                    solve.run(maze, canvas, state);
                    mazeCurrentSpeed.innerHTML = solveSpeed + 1;
                    state.solve.animationDelay = animationDelays[solveSpeed];
                    solve.run(maze, canvas, state);
                }
                else {
                    mazeCurrentSpeed.innerHTML = solveSpeed + 1;
                    state.solve.animationDelay = animationDelays[solveSpeed];
                }
            }

            stopDefault(evt);

        }, false);
    }

    // Decrease the size of the paths in the maze.
    if (mazeDecreaseSizeCtrl) {
        mazeDecreaseSizeCtrl.addEventListener('click', function(evt) {

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

    // Auto size the maze to best fit.
    if (mazeAutoSizeCtrl) {
        mazeAutoSizeCtrl.addEventListener('click', function(evt) {

            // First reset the solve module's state.
            solve.run(maze, canvas, state, true);

            load.autoSetLocationSize(state);
            maze = build(state);
            load.canvas(maze, state);
            paint.all(maze, canvas, state);

            stopDefault(evt);

        }, false);
    }

    // Increase the size of the paths in the maze.
    if (mazeIncreaseSizeCtrl) {
        mazeIncreaseSizeCtrl.addEventListener('click', function(evt) {

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

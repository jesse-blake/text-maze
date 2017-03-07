'use strict';

var utils    = require('./utils');
var controls = require('./controls');
var paint    = require('./paint');

// Solve the maze automagically, or just show the solution.
module.exports = {

    run: function(maze, canvas, state, doReset) {
        var s = state.solve;

        if (doReset) {
            reset(maze, canvas, state);

            controls.updateCtrlText('maze-show-solution-ctrl', 'Show Solution');
            state.solve.showingSolution = false;

            return;
        }

        // Currently running so stop and return.
        else if (s.running) {
            stop(maze, state);
            return;
        }

        // Prepare to start solving if the current location isn't set or is at
        // maze's end, or if the most recent action was to show the solution.
        else if (!s.curr.x || atEnd(maze, s.curr.x, s.curr.y) || state.solve.showingSolution) {
            reset(maze, canvas, state);

            controls.updateCtrlText('maze-show-solution-ctrl', 'Show Solution');
            state.solve.showingSolution = false;

            maze[s.curr.y][s.curr.x].visited = true;
            paintRoute(maze, canvas, state, s.curr.x, s.curr.y);
        }

        s.running = true;

        controls.updateCtrlText('maze-solve-ctrl', 'Stop');
        controls.hideSolveResetCtrl();

        s.interval = setInterval(function() {
            if (atEnd(maze, s.curr.x, s.curr.y)) {
                stop(maze, state);
            }
            else {
                exploreNextLocation(maze, canvas, state, true);
            }
        }.bind(this), s.animationDelay);
    },

    // Just show the solution without animation.
    show: function(maze, canvas, state) {
        var s = state.solve;

        state.solve.showingSolution = !state.solve.showingSolution;

        reset(maze, canvas, state);

        if (state.solve.showingSolution) {
            while (!atEnd(maze, s.curr.x, s.curr.y)) {
                exploreNextLocation(maze, canvas, state, false);
            }
            controls.updateCtrlText('maze-show-solution-ctrl', 'Hide Solution');
        }
        else {
            controls.updateCtrlText('maze-show-solution-ctrl', 'Show Solution');
        }
    }
};

// Stop or pause solving, depending on the current location.
function stop(maze, state) {
    var s = state.solve;

    clearInterval(s.interval);
    s.interval = null;

    s.running = false;

    if (atEnd(maze, s.curr.x, s.curr.y)) {
        controls.updateCtrlText('maze-solve-ctrl', 'Solve');
        controls.hideSolveResetCtrl();
    }
    else {
        controls.updateCtrlText('maze-solve-ctrl', 'Continue');
        controls.showSolveResetCtrl();
    }
}

// Reset the solve state.
function reset(maze, canvas, state) {
    var x, y;

    var s  = state.solve;
    var ep = state.endpoints;

    // Sometimes reset is used in the running state, so clear the interval
    // that may or may not be there.
    clearInterval(s.interval);
    s.interval = null;

    s.running = false;
    s.stack.length = 0;
    s.prev = null;
    s.curr = {
        'x': ep.start.x,
        'y': ep.start.y
    };

    controls.updateCtrlText('maze-solve-ctrl', 'Solve');
    controls.hideSolveResetCtrl();

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            maze[y][x].visited  = false;
            maze[y][x].solution = false;
            maze[y][x].color    = 'white';
        }
    }

    paint.all(maze, canvas, state);
}

// Returns true if the coordinates give the maze's end.
function atEnd(maze, x, y) {
    return 'end' in maze[y][x] && maze[y][x].end;
}

// Move to the next unvisited location, or backtrack, until the
// final location is found.
function exploreNextLocation(maze, canvas, state, colorBacktracking) {
    var s = state.solve;
    var next = getNextLocation(maze, s.curr.x, s.curr.y);

    // An unvisited location was found.
    if (next) {
        s.stack.push(s.curr);
        s.prev = s.curr;
        s.curr = next;
        maze[s.curr.y][s.curr.x].visited = true;
    }

    // Need to backtrack.
    else {
        s.prev = s.curr;
        s.curr = s.stack.pop();
    }

    paintRoute(maze, canvas, state, colorBacktracking);
}

// Look for an unvisited path in all four directions. Return the
// coordinates of the first one found, or null if all visited.
function getNextLocation(maze, x, y) {
    var i, loc;

    var nextLocOpts = [
        { 'x': x-1, 'y': y   },
        { 'x': x,   'y': y+1 },
        { 'x': x+1, 'y': y   },
        { 'x': x,   'y': y-1 }
    ];

    // // Solve the maze randomly.
    // utils.shuffleArrayInPlace(nextLocOpts);

    for (i = 0; i < nextLocOpts.length; i++) {
        loc = nextLocOpts[i];

        if (typeof maze[loc.y] !== 'undefined' && typeof maze[loc.y][loc.x] !== 'undefined') {
            if (maze[loc.y][loc.x].path && !maze[loc.y][loc.x].visited) {
                return loc;
            }
        }
    }

    return null;
}

// Paint the current and previous location.
function paintRoute(maze, canvas, state, colorBacktracking) {
    var s = state.solve;

    if (s.prev) {

        // Currently backtracking so paint the previous location to
        // indicate that it's not on the solution path.
        if (maze[s.curr.y][s.curr.x].solution) {

            maze[s.prev.y][s.prev.x].solution = false;
            if (colorBacktracking) {
                maze[s.prev.y][s.prev.x].color = 'lightgray';
            }
            else {
                maze[s.prev.y][s.prev.x].color = 'white';
            }
            paint.one(maze, canvas, state, s.prev.x, s.prev.y);
        }

        // Not currently backtracking so paint the previous location
        // to indicate that it's assumed to be on the solution path.
        else {

            maze[s.prev.y][s.prev.x].solution = true;
            maze[s.prev.y][s.prev.x].color = 'red';
            paint.one(maze, canvas, state, s.prev.x, s.prev.y);
        }
    }

    // Paint the current location.
    maze[s.curr.y][s.curr.x].color = 'red';
    paint.one(maze, canvas, state, s.curr.x, s.curr.y);
}

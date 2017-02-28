'use strict';

var utils    = require('./utils');
var controls = require('./controls');
var paint    = require('./paint');

// Solve the maze automagically.
module.exports = function(app, doReset) {
    var s = app.solve;

    // The reset button was clicked, so reset and return.
    if (doReset) {
        reset(app);
        return;
    }

    // Currently running so stop and return.
    else if (s.running) {
        stop(app);
        return;
    }

    // If the current location is the maze's end, reset before running again.
    else if (atEnd(app.maze, s.curr.x, s.curr.y)) {
        reset(app);
    }

    s.running = utils.yes;

    controls.updateCtrlText('solve-maze-ctrl', 'Stop');
    controls.hideSolveResetCtrl();

    s.interval = setInterval(function() {
        if (atEnd(app.maze, s.curr.x, s.curr.y)) {
            stop(app);
        }
        else {
            exploreNextLocation(app);
        }
    }.bind(this), s.delay);
};

// Stop solving.
function stop(app) {
    var s = app.solve;

    clearInterval(s.interval);
    s.interval = null;

    s.running = utils.no;

    if (atEnd(app.maze, s.curr.x, s.curr.y)) {
        controls.updateCtrlText('solve-maze-ctrl', 'Solve');
        controls.hideSolveResetCtrl();
    }
    else {
        controls.updateCtrlText('solve-maze-ctrl', 'Continue');
        controls.showSolveResetCtrl();
    }
}

// Reset the solve state.
function reset(app) {
    var x, y;

    var s    = app.solve;
    var ep   = app.endpoints;
    var maze = app.maze;

    s.running = utils.no;
    s.stack.length = 0;
    s.curr = {
        'x': ep.start.x,
        'y': ep.start.y
    };

    controls.updateCtrlText('solve-maze-ctrl', 'Solve');
    controls.hideSolveResetCtrl();

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {
            maze[y][x].visited = utils.no;
            maze[y][x].backtracked = utils.no;
            maze[y][x].color = 'white';
        }
    }

    paint.all(app);
}

// Returns true if the coordinates give the maze's end.
function atEnd(maze, x, y) {
    return 'end' in maze[y][x] && maze[y][x].end;
}

// Move the the next unvisited location, or backtrack, until the
// final location is found.
function exploreNextLocation(app) {
    var s    = app.solve;
    var next = getNextLocation(app.maze, app.solve.curr.x, app.solve.curr.y);

    // An unvisited location was found.
    if (next) {
        s.stack.push(s.curr);
        s.prev = s.curr;
        s.curr = next;
        app.maze[s.curr.y][s.curr.x].visited = utils.yes;
    }

    // Need to backtrack.
    else {
        s.prev = s.curr;
        s.curr = s.stack.pop();
    }

    paintRoute(app, s);
}

// Look for an unvisited path in all four directions. Return the
// coordinates of the first one found, or null if all visited.
function getNextLocation(maze, x, y) {
    var i, loc, nextLocOpts = [
        { 'x': x-1, 'y': y   },
        { 'x': x,   'y': y+1 },
        { 'x': x+1, 'y': y   },
        { 'x': x,   'y': y-1 }
    ];

    // Solve the maze randomly.
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

// Paint the current and previous location depending.
function paintRoute(app) {
    var s    = app.solve;
    var maze = app.maze;

    if (s.prev) {

        // Currently backtracking so paint the previous location to
        // indicate that it's not on the solution path.
        if (maze[s.curr.y][s.curr.x].backtracked) {
            maze[s.prev.y][s.prev.x].backtracked = utils.no;
            maze[s.prev.y][s.prev.x].color = 'lightgray';
            paint.one(app, s.prev.x, s.prev.y);
        }

        // Not currently backtracking so paint the previous location
        // to indicate that it's assumed to be on the solution path.
        else {
            maze[s.prev.y][s.prev.x].backtracked = utils.yes;
            maze[s.prev.y][s.prev.x].color = 'red';
            paint.one(app, s.prev.x, s.prev.y);
        }
    }

    // Paint the current location.
    maze[s.curr.y][s.curr.x].color = 'red';
    paint.one(app, s.curr.x, s.curr.y);
}

'use strict';

var utils = require('./utils');
var paint = require('./paint');

// Auto-solve the maze.
module.exports = {

    // Start solving.
    start: function(app, clicked) {
        // Solver state.
        var ss = {
            locationSize: app.locationSize,
            canvasContext: app.canvasContext,
            stack: [],
            prev: null,
            curr: {
                'x': app.endpoints.start.x,
                'y': app.endpoints.start.y
            },
            done: utils.no
        };

        clicked.innerHTML = 'Stop';
        reset(app.maze);
        paint.all(app);
        app.solving = utils.yes;

        app.solverInterval = setInterval(function() {
            if (app.maze[ss.curr.y][ss.curr.x].end) {
                this.stop(app, clicked);
            }
            else {
                exploreNextLocation(app, ss);
            }
        }.bind(this), app.solverDelay);
    },

    // Stop solving.
    stop: function(app, clicked) {
        var x, y, maze = app.maze;

        clearInterval(app.solverInterval); 
        app.solverInterval = null;
        clicked.innerHTML = 'Auto Solve';
        app.solving = utils.no;
    }
};

// Reset the state of the flags in the maze used by the solver.
function reset(maze) {
    var x, y;

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {
            maze[y][x].visited = utils.no;
            maze[y][x].backtracked = utils.no;
            maze[y][x].color = 'white';
        }
    }
}

// Move the the next unvisited location, or backtrack, until the
// final location is found.
function exploreNextLocation(app, solveState) {
    var maze = app.maze;
    var ss   = solveState;
    var next = getNextLocation(maze, ss.curr.x, ss.curr.y);

    // An unvisited location was found.
    if (next) {
        ss.stack.push(ss.curr);
        ss.prev = ss.curr;
        ss.curr = next;
        maze[ss.curr.y][ss.curr.x].visited = utils.yes;
    }

    // Need to backtrack.
    else {
        ss.prev = ss.curr;
        ss.curr = ss.stack.pop();
    }

    paintRoute(app, ss);
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
function paintRoute(app, solveState) {
    var maze = app.maze;
    var ss = solveState;

    if (ss.prev) {

        // Currently backtracking so paint the previous location to
        // indicate that it's not on the solution path.
        if (maze[ss.curr.y][ss.curr.x].backtracked) {
            maze[ss.prev.y][ss.prev.x].backtracked = utils.no;
            maze[ss.prev.y][ss.prev.x].color = 'lightgray';
            paint.one(app, ss.prev.x, ss.prev.y);
        }

        // Not currently backtracking so paint the previous location
        // to indicate that it's assumed to be on the solution path.
        else {
            maze[ss.prev.y][ss.prev.x].backtracked = utils.yes;
            maze[ss.prev.y][ss.prev.x].color = 'red';
            paint.one(app, ss.prev.x, ss.prev.y);
        }
    }

    // Paint the current location.
    maze[ss.curr.y][ss.curr.x].color = 'red';
    paint.one(app, ss.curr.x, ss.curr.y);
}

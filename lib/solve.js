'use strict';

var utils        = require('./utils');
var paint        = require('./paint');

// Solve the maze automagically, or just show the solution.
module.exports = {

    // Start the solve animation fresh or from pause state.
    start: function(maze, canvas, state, endOfMazeCtrlsUpdateCallback) {
        var s = state.solve;

        // Start fresh if curr isn't set or curr is at the maze's end.
        if (!s.curr.x || atEnd(maze, s.curr.x, s.curr.y)) {
            reset(maze, state);

            maze[s.curr.y][s.curr.x].visited = true;

            paint.all(maze, canvas, state);
            paintRoute(maze, canvas, state);
        }

        s.running = true;

        s.interval = setInterval(function() {
            if (atEnd(maze, s.curr.x, s.curr.y)) {
                stop(state);

                // Call back to update the controls.
                endOfMazeCtrlsUpdateCallback();
            }
            else {
                exploreNextLocation(maze, canvas, state);
            }
        }.bind(this), s.delay);
    },

    // Pause the solve animation.
    pause: function(state) {
        stop(state);
    },

    // Reset the solve animation.
    reset: function(maze, state) {
        reset(maze, state);
    },

    // Set the solution to the maze. Sets the property 'key' at every location
    // in the maze that lies on the solution path. Call this once after
    // building a maze.
    setSolution: function(maze, state) {
        var s = state.solve, next;

        reset(maze, state);

        maze[s.curr.y][s.curr.x].visited = true;
        maze[s.curr.y][s.curr.x].key     = true;
        maze[s.curr.y][s.curr.x].color   = state.colors.solution;

        while (!atEnd(maze, s.curr.x, s.curr.y)) {
            next = getNextLocation(maze, s.curr.x, s.curr.y);

            // If an unvisited location was found.
            if (next) {
                s.stack.push(s.curr);
                s.prev = s.curr;
                s.curr = next;

                maze[s.curr.y][s.curr.x].visited = true;
                maze[s.curr.y][s.curr.x].key     = true;
                maze[s.curr.y][s.curr.x].color   = state.colors.solution;
            }

            // Dead end, so backtrack.
            else {
                maze[s.curr.y][s.curr.x].key   = false;
                maze[s.curr.y][s.curr.x].color = state.colors.unvisited;

                s.prev = s.curr;
                s.curr = s.stack.pop();
            }
        }
    }
};

// Reset the solve state.
function reset(maze, state) {
    var x, y;

    var s  = state.solve;
    var ep = state.endpoints;

    stop(state);

    s.stack.length = 0;
    s.prev = null;
    s.curr = {
        'x': ep.start.x,
        'y': ep.start.y
    };

    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {

            maze[y][x].visited  = false;
            maze[y][x].solution = false;
            maze[y][x].color    = state.colors.unvisited;
        }
    }
}

// Used to stop at maze's end or to pause.
function stop(state) {
    clearInterval(state.solve.interval);
    state.solve.interval = null;
    state.solve.running = false;
}

// Returns true if the coordinates give the maze's end.
function atEnd(maze, x, y) {
    return 'end' in maze[y][x] && maze[y][x].end;
}

// Move to the next unvisited location, or backtrack, until the
// final location is found.
function exploreNextLocation(maze, canvas, state) {
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

    paintRoute(maze, canvas, state);
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
function paintRoute(maze, canvas, state) {
    var s = state.solve;

    if (s.prev) {

        // Currently backtracking so color the previous location to
        // indicate that it's not on the solution path.
        if (maze[s.curr.y][s.curr.x].solution) {
            maze[s.prev.y][s.prev.x].solution = false;
            maze[s.prev.y][s.prev.x].color = state.colors.backtracked;
        }

        // Not currently backtracking so color the previous location
        // to indicate that it's assumed to be on the solution path.
        else {
            maze[s.prev.y][s.prev.x].solution = true;
            maze[s.prev.y][s.prev.x].color = state.colors.solution;
        }
    }

    maze[s.curr.y][s.curr.x].color = state.colors.solution;

    if (s.prev) {
        paint.one(maze, canvas, state, s.prev.x, s.prev.y);
    }
    paint.one(maze, canvas, state, s.curr.x, s.curr.y);
}

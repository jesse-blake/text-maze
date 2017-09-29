'use strict';

// Finds the solution path through a flattened maze. Values of cells on the
// solution path are negated, i.e. non-path cells remain 0, non-text cells on
// the solution path become -1, and text cells on the solution path become -2.
module.exports = function(maze, endpoints) {

    // Solve state.
    var s = {
        stack: [],
        endpoints: endpoints,
        curr: {
            x: endpoints.start.x,
            y: endpoints.start.y
        },
        prev: null
    };

    // Next cell to visit in this search for the solution.
    var next;

    // While not at the end of the maze.
    while (! (s.curr.x == endpoints.end.x && s.curr.y == endpoints.end.y)) {

        next = getNextCell(maze, s.curr.x, s.curr.y);

        // Visit the next unvisited cell.
        if (next) {
            // Cells with negated values indicate that they're on the maze's
            // solution path.
            if (maze[s.curr.y][s.curr.x] > 0) maze[s.curr.y][s.curr.x] *= -1;

            s.stack.push(s.curr);
            s.prev = s.curr;
            s.curr = next;
        }

        // Dead end, so backtrack.
        else {
            // Dead end cells are multiplied by +/- 10 to indicate that they're
            // not on the solution path, and when the solution path is found
            // they'll be reset to their original positive value.
            maze[s.curr.y][s.curr.x] *= maze[s.curr.y][s.curr.x] < 0 ? 10 : -10;

            s.prev = s.curr;
            s.curr = s.stack.pop();
        }
    }

    // Restore visited dead end cells to their original values.
    for (var y = 0; y < maze.length; y++) {
        for (var x = 0; x < maze[y].length; x++) {
            if (maze[y][x] <= -10) {
                maze[y][x] = Math.abs(maze[y][x] / 10);
            }
        }
    }

    return maze;
};

// Look for an unvisited path in all four directions from cell x,y. Return the
// coordinates of the first one found or null if all visited.
function getNextCell(maze, x, y) {
    var i, loc;

    var nextLocOpts = [
        { 'x': x-1, 'y': y   },
        { 'x': x,   'y': y+1 },
        { 'x': x+1, 'y': y   },
        { 'x': x,   'y': y-1 }
    ];

    for (i = 0; i < nextLocOpts.length; i++) {
        loc = nextLocOpts[i];

        if (typeof maze[loc.y] !== 'undefined' && typeof maze[loc.y][loc.x] !== 'undefined') {
            // When a cell's value is > 0, the cell is on a path and hasn't
            // been visited.
            if (maze[loc.y][loc.x] > 0) {
                return loc;
            }
        }
    }

    return null;
}

'use strict';

var utils = require('./index');

// Search for cells in the maze that can be connected to fill in blank areas of
// the maze.
module.exports = function(maze) {
    var x, y, i;

    var cells = [];

    // Create a shuffled list of all cell coordinates to randomly search for
    // cells to connect.
    for (y = 0; y < maze.length; y++) {
        for (x = 0; x < maze[y].length; x++) {
            cells.push([x, y]);
        }
    }

    utils.shuffleArray(cells);

    for (i = 0; i < cells.length; i++) {
        x = cells[i][0];
        y = cells[i][1];

        if (y > 0 && x > 0 && y < maze.length-1 && x < maze[y].length-1) {
            if (maze[y][x] === 0) {
                checkAround(maze, x, y);
            }
        }
    }

    return maze;
};

// Examine the cells adjoining the cell at x,y to see if cell x,y can be
// connected as a path in the maze to fill in blank areas of the maze.
function checkAround(maze, x, y) {
    var i, adjacent, addPath = false;

    // Cell x,y can only be connected in the maze only if it is already
    // connected at one, and only one, of its sides.
    var onlyOneConnection = !! maze[y-1][x] +
                            !! maze[y+1][x] +
                            !! maze[y][x-1] +
                            !! maze[y][x+1] === 1;

    if (! onlyOneConnection) {
        return;
    }

    // Cell x,y can also only be connected in the maze if the cells at its
    // diagonals across from its connected side are also unconnected.
    switch (true) {
    case !! maze[y-1][x]:
        addPath = maze[y+1][x-1] + maze[y+1][x+1] === 0;
        break;

    case !! maze[y+1][x]:
        addPath = maze[y-1][x-1] + maze[y-1][x+1] === 0;
        break;

    case !! maze[y][x-1]:
        addPath = maze[y-1][x+1] + maze[y+1][x+1] === 0;
        break;

    case !! maze[y][x+1]:
        addPath = maze[y-1][x-1] + maze[y+1][x-1] === 0;
    }

    if (addPath) {

        // The above conditions are met, so connect cell x,y in the maze.
        maze[y][x] = 1;

        adjacent = [[x,y-1], [x,y+1], [x-1,y], [x+1,y]];

        utils.shuffleArray(adjacent);

        // Check the cells adjoining the cell just connected, in random order,
        // to see if they can also be connected.
        for (i = 0; i < adjacent.length; i++) {
            x = adjacent[i][0];
            y = adjacent[i][1];

            if (! maze[y][x]) {
                if (y > 0 && x > 0 && y < maze.length-1 && x < maze[y].length-1) {
                    checkAround(maze, x, y);
                }
            }
        }
    }
}

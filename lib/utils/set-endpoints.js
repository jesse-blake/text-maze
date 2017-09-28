'use strict';

// Determine and set the coordinates for where the maze starts and ends.
module.exports = function(maze) {
    var i;

    var endpoints = {
        start: { x: null, y: null },
        end:   { x: null, y: null }
    };

    // Start adjacent to the highest path adjoining the maze's left edge.
    for (i = 0; i < maze.length; i++) {
        if (maze[i][1]) {
            endpoints.start.x = 0;
            endpoints.start.y = i;
            break;
        }
    }

    // End adjacent to the lowest path adjoining the maze's right edge.
    for (i = maze.length-1; i >= 0; i--) {
        if (maze[i][maze[i].length - 2]) {
            endpoints.end.x = maze[i].length - 1;
            endpoints.end.y = i;
            break;
        }
    }

    maze[endpoints.start.y][endpoints.start.x] = 1;
    maze[endpoints.end.y][endpoints.end.x] = 1;

    return { maze: maze, endpoints: endpoints };
};

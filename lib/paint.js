'use strict';

// Paint a single location or all locations in the maze.
module.exports = {

    // Paint the entire maze.
    all: function(app) {
        var x, y, color;

        for (y = 0; y < app.maze.length; y++) {
            for (x = 0; x < app.maze[y].length; x++) {
                // Paint one location.
                this.one(app, x, y);
            }
        }
    },

    // Paint a single location in the maze.
    one: function(app, x, y) {
        var maze  = app.maze;
        var cc    = app.canvasContext;
        var ls    = app.locationSize;
        var color = 'black';

        // Half border: half the width of the maze's borders.
        var hb = Math.floor(ls / 6) || 1;

        // Text margin: margin between the text and borders.
        var tm = ls >= 5 ? 1 : 0;

        if (onPath(maze, x, y)) {

            // Paint borders: top/right/bottom/left.
            if (!onPath(maze, x, y-1)) {
                paint(cc, color, x*ls-hb,    y*ls-hb,    ls+2*hb, 2*hb);
            }
            if (!onPath(maze, x+1, y))      {
                paint(cc, color, x*ls+ls-hb, y*ls-hb,    2*hb,    ls+2*hb);
            }
            if (!onPath(maze, x, y+1)) {
                paint(cc, color, x*ls-hb,    y*ls+ls-hb, ls+2*hb, 2*hb);
            }
            if (!onPath(maze, x-1, y)) {
                paint(cc, color, x*ls-hb,    y*ls-hb,    2*hb,    ls+2*hb);
            }

            // Paint background color: top/right/bottom/left/middle.
            color = maze[y][x].color;
            if (onPath(maze, x, y-1)) {
                paint(cc, color, x*ls+hb, y*ls, ls-2*hb, hb);
            }
            if (onPath(maze, x+1, y)) {
                paint(cc, color, x*ls+ls-hb, y*ls+hb, hb, ls-2*hb);
            }
            if (onPath(maze, x, y+1)) {
                paint(cc, color, x*ls+hb, y*ls+ls-hb, ls-2*hb, hb);
            }
            if (onPath(maze, x-1, y)) {
                paint(cc, color, x*ls, y*ls+hb, hb, ls-2*hb);
            }
            paint(cc, color, x*ls+hb, y*ls+hb, ls-2*hb, ls-2*hb);


            // Paint (show/hide) text: top/right/bottom/left/middle.
            if (app.showText && isCharacter(maze, x, y)) {

                color = 'black';

                if (isCharacter(maze, x, y-1)) {
                    paint(cc, color, x*ls+hb+tm,    y*ls,          ls-2*hb-2*tm, hb+tm);
                }
                if (isCharacter(maze, x+1, y)) {
                    paint(cc, color, x*ls+ls-hb-tm, y*ls+hb+tm,    hb+tm,        ls-2*hb-2*tm);
                }
                if (isCharacter(maze, x, y+1)) {
                    paint(cc, color, x*ls+hb+tm,    y*ls+ls-hb-tm, ls-2*hb-2*tm, hb+tm);
                }
                if (isCharacter(maze, x-1, y)) {
                    paint(cc, color, x*ls,          y*ls+hb+tm,    hb+tm,        ls-2*hb-2*tm);
                }

                paint(cc, color, x*ls+hb+tm, y*ls+hb+tm, ls-2*hb-2*tm, ls-2*hb-2*tm);
            }

            // Paint start and end openings.
            color = 'white';
            paint(cc, color, app.endpoints.start.x*ls-hb,  app.endpoints.start.y*ls-hb, 2*hb, ls+2*hb);
            paint(cc, color, app.endpoints.end.x*ls+ls-hb, app.endpoints.end.y*ls-hb,   2*hb, ls+2*hb);
        }
    }
};


// Returns true if the given coordinates refer to an object that
// has the 'path' property set.
function onPath(maze, x, y) {
    return y >= 0             &&
           y < maze.length    &&
           x >= 0             &&
           x < maze[y].length &&
           maze[y][x].path;
}

// Returns true if the coordinates are onPath() and refer to an
// object that doesn't have its 'connection' property set.
function isCharacter(maze, x, y) {
    return onPath(maze, x, y) && !maze[y][x].connection;
}

// Paint to the canvas.
function paint(canvasContext, color, x, y, width, height) {
    canvasContext.fillStyle = color; 
    canvasContext.fillRect(x, y, width, height);
}

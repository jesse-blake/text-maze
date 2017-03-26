'use strict';

var utils     = require('../utils');
var webColors = require('./web-colors');

// Paint a single location or all locations in the maze.
module.exports = {

    // Paint the entire maze.
    all: function(maze, canvas, state) {
        var x, y;

        var width  = state.maxMazeWidth * state.locationSize;
        var height = maze.length  * state.locationSize;

        canvas.clearRect(0, 0, width, height);

        for (y = 0; y < maze.length; y++) {
            for (x = 0; x < maze[y].length; x++) {
                // Paint one location.
                this.one(maze, canvas, state, x, y);
            }
        }
    },

    // Paint a single location in the maze.
    one: function(maze, canvas, state, x, y) {
        var clr, fluctuate;

        // True if the vertically/horizontally adjacent locations are paths.
        var onPathAbv, onPathRgt, onPathBlw, onPathLft;

        // True if the diagonally adjacent locations are paths.
        var onPathAbvRgt, onPathRgtBlw, onPathBlwLft, onPathLftAbv;

        var colors = state.colors;

        var ls = state.locationSize;

        // Border diameter.
        var bd = 1;

        // Text margin, i.e. the margin between the text and borders.
        var tm = ls < 10 ? 0 : Math.floor(ls / 5) - 1;

        if (onPath(maze, x, y)) {

            onPathAbv = onPath(maze, x, y-1);
            onPathRgt = onPath(maze, x+1, y);
            onPathBlw = onPath(maze, x, y+1);
            onPathLft = onPath(maze, x-1, y);

            onPathAbvRgt = onPath(maze, x+1, y-1);
            onPathRgtBlw = onPath(maze, x+1, y+1);
            onPathBlwLft = onPath(maze, x-1, y+1);
            onPathLftAbv = onPath(maze, x-1, y-1);

            clr = 'black';

            // Paint borders.
            if (!onPathAbv) {
                paint(canvas, clr, x*ls+bd, y*ls-2*bd, ls-2*bd, bd);
            }
            if (!onPathRgt) {
                paint(canvas, clr, x*ls+ls+bd, y*ls+bd, bd, ls-2*bd);
            }
            if (!onPathBlw) {
                paint(canvas, clr, x*ls+bd, y*ls+ls+bd, ls-2*bd, bd);
            }
            if (!onPathLft) {
                paint(canvas, clr, x*ls-2*bd, y*ls+bd, bd, ls-2*bd);
            }

            // Paint border corners.
            if (!onPathAbv && !onPathRgt) {
                paint(canvas, clr, x*ls+ls-bd, y*ls-2*bd, 3*bd, bd);
                paint(canvas, clr, x*ls+ls+bd, y*ls-bd, bd, 2*bd);
            }
            else if (!onPathAbv && !onPathAbvRgt) {
                paint(canvas, clr, x*ls+ls-bd, y*ls-2*bd, bd, bd);
            }
            else if (!onPathRgt && !onPathAbvRgt) {
                paint(canvas, clr, x*ls+ls+bd, y*ls, bd, bd);
            }

            if (!onPathRgt && !onPathBlw) {
                paint(canvas, clr, x*ls+ls+bd, y*ls+ls-bd, bd, 2*bd);
                paint(canvas, clr, x*ls+ls-bd, y*ls+ls+bd, 3*bd, bd);
            }
            else if (!onPathRgt && !onPathRgtBlw) {
                paint(canvas, clr, x*ls+ls+bd, y*ls+ls-bd, bd, bd);
            }
            else if (!onPathBlw && !onPathRgtBlw) {
                paint(canvas, clr, x*ls+ls-bd, y*ls+ls+bd, bd, bd);
            }

            if (!onPathBlw && !onPathLft) {
                paint(canvas, clr, x*ls-2*bd, y*ls+ls-bd, bd, 2*bd);
                paint(canvas, clr, x*ls-2*bd, y*ls+ls+bd, 3*bd, bd);
            }
            else if (!onPathBlw && !onPathBlwLft) {
                paint(canvas, clr, x*ls, y*ls+ls+bd, bd, bd);
            }
            else if (!onPathLft && !onPathBlwLft) {
                paint(canvas, clr, x*ls-2*bd, y*ls+ls-bd, bd, bd);
            }

            if (!onPathLft && !onPathAbv) {
                paint(canvas, clr, x*ls-2*bd, y*ls-2*bd, 3*bd, bd);
                paint(canvas, clr, x*ls-2*bd, y*ls-bd, bd, 2*bd);
            }
            else if (!onPathLft && !onPathLftAbv) {
                paint(canvas, clr, x*ls-2*bd, y*ls, bd, bd);
            }
            else if (!onPathAbv && !onPathLftAbv) {
                paint(canvas, clr, x*ls, y*ls-2*bd, bd, bd);
            }

            if (state.solve.running) {
                // Paint the solve animation state.

                fluctuate = colors.fluctuateSolutionColor;

                if (onPathAbv) {
                    clr = getConnectingColor(maze, colors, x, y-1, maze[y][x].color);
                    clr = fluctuate ? fluctuateColor(clr, colors) : clr;
                    paint(canvas, clr, x*ls+bd+tm, y*ls, ls-2*bd-2*tm, bd+tm);
                }
                if (onPathRgt) {
                    clr = getConnectingColor(maze, colors, x+1, y, maze[y][x].color);
                    clr = fluctuate ? fluctuateColor(clr, colors) : clr;
                    paint(canvas, clr, x*ls+ls-bd-tm, y*ls+bd+tm, bd+tm, ls-2*bd-2*tm);
                }
                if (onPathBlw) {
                    clr = getConnectingColor(maze, colors, x, y+1, maze[y][x].color);
                    clr = fluctuate ? fluctuateColor(clr, colors) : clr;
                    paint(canvas, clr, x*ls+bd+tm, y*ls+ls-bd-tm, ls-2*bd-2*tm, bd+tm);
                }
                if (onPathLft) {
                    clr = getConnectingColor(maze, colors, x-1, y, maze[y][x].color);
                    clr = fluctuate ? fluctuateColor(clr, colors) : clr;
                    paint(canvas, clr, x*ls, y*ls+bd+tm, bd+tm, ls-2*bd-2*tm);
                }
                clr = maze[y][x].color;
                clr = fluctuate ? fluctuateColor(clr, colors) : clr;
                paint(canvas, clr, x*ls+bd+tm, y*ls+bd+tm, ls-2*bd-2*tm, ls-2*bd-2*tm);
            }

            else {

                // Paint the staticly known solution.
                if (state.currentlyShowingSolution && isKey(maze, x, y)) {
                    fluctuate = colors.fluctuateSolutionColor;

                    if (isKey(maze, x, y-1)) {
                        clr = fluctuate ? fluctuateColor(colors.solution, colors) : colors.solution;
                        paint(canvas, clr, x*ls+bd+tm, y*ls, ls-2*bd-2*tm, bd+tm);
                    }
                    if (isKey(maze, x+1, y)) {
                        clr = fluctuate ? fluctuateColor(colors.solution, colors) : colors.solution;
                        paint(canvas, clr, x*ls+ls-bd-tm, y*ls+bd+tm, bd+tm, ls-2*bd-2*tm);
                    }
                    if (isKey(maze, x, y+1)) {
                        clr = fluctuate ? fluctuateColor(colors.solution, colors) : colors.solution;
                        paint(canvas, clr, x*ls+bd+tm, y*ls+ls-bd-tm, ls-2*bd-2*tm, bd+tm);
                    }
                    if (isKey(maze, x-1, y)) {
                        clr = fluctuate ? fluctuateColor(colors.solution, colors) : colors.solution;
                        paint(canvas, clr, x*ls, y*ls+bd+tm, bd+tm, ls-2*bd-2*tm);
                    }
                    clr = fluctuate ? fluctuateColor(colors.solution, colors) : colors.solution;
                    paint(canvas, clr, x*ls+bd+tm, y*ls+bd+tm, ls-2*bd-2*tm, ls-2*bd-2*tm);
                }

                // Paint the text.
                if (state.currentlyShowingText && isCharacter(maze, x, y)) {
                    fluctuate = colors.fluctuateTextColor;

                    if (isCharacter(maze, x, y-1)) {
                        clr = fluctuate ? fluctuateColor(colors.text, colors) : colors.text;
                        paint(canvas, clr, x*ls+bd+tm, y*ls, ls-2*bd-2*tm, bd+tm);
                    }
                    if (isCharacter(maze, x+1, y)) {
                        clr = fluctuate ? fluctuateColor(colors.text, colors) : colors.text;
                        paint(canvas, clr, x*ls+ls-bd-tm, y*ls+bd+tm, bd+tm, ls-2*bd-2*tm);
                    }
                    if (isCharacter(maze, x, y+1)) {
                        clr = fluctuate ? fluctuateColor(colors.text, colors) : colors.text;
                        paint(canvas, clr, x*ls+bd+tm, y*ls+ls-bd-tm, ls-2*bd-2*tm, bd+tm);
                    }
                    if (isCharacter(maze, x-1, y)) {
                        clr = fluctuate ? fluctuateColor(colors.text, colors) : colors.text;
                        paint(canvas, clr, x*ls, y*ls+bd+tm, bd+tm, ls-2*bd-2*tm);
                    }
                    clr = fluctuate ? fluctuateColor(colors.text, colors) : colors.text;
                    paint(canvas, clr, x*ls+bd+tm, y*ls+bd+tm, ls-2*bd-2*tm, ls-2*bd-2*tm);
                }
            }

            // Paint start and end openings.
            clr = state.colors.unvisited;
            paint(canvas, clr, state.endpoints.start.x*ls-bd,  state.endpoints.start.y*ls-bd, 2*bd, ls+2*bd);
            paint(canvas, clr, state.endpoints.end.x*ls+ls-bd, state.endpoints.end.y*ls-bd,   2*bd, ls+2*bd);
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

// Returns true if the given coordinates refer to an object that
// has the 'key' property set (meaning it's part of the solution key).
function isKey(maze, x, y) {
    return y >= 0             &&
           y < maze.length    &&
           x >= 0             &&
           x < maze[y].length &&
           maze[y][x].key;
}

// Returns the color to be used when painting the area of a location
// nearest to an adjacent location.
function getConnectingColor(maze, colors, x, y, defaultColor, fluctuate) {
    if (maze[y][x].color === colors.backtracked) {
        return colors.backtracked;
    }
    else if (maze[y][x].color === colors.unvisited) {
        return colors.unvisited;
    }
    return defaultColor;
}

function fluctuateColor(color, colors) {

    // Returns a random number, in a range centered on x. When doWrap is true,
    // the range wraps around either end of the domain when it overflows the
    // domain. Range and domain are assumed to start at 0.
    //
    // @param domain: An integer signifying the domain [0, domain].
    // @param range:  An integer divisible by 2 and < than domain.
    // @param x:      An integer in domain [0, domain].
    function randomInRangeInDomain(x, range, domain, doWrap) {
        var result, min, max, rangeIdx;

        min = x - range / 2;
        max = x + range / 2;

        if (min < 0 || max > domain) {

            // Wrap the domain and return the random number.
            if (doWrap) {
                min = min < 0      ? domain + min + 1 : min;
                max = max > domain ? max - domain - 1 : max;

                result = min;
                rangeIdx = utils.randomInRange(0, range);

                while (rangeIdx > 0) {
                    result++;
                    if (result > domain) {
                        result = max;
                    }
                    rangeIdx--;
                }

                return result;
            }

            // Just correct the overflow.
            min = min < 0      ? 0      : min;
            max = max > domain ? domain : max;
        }

        result = utils.randomInRange(min, max);

        return result;
    }

    var h, hRange = 40, hDomain = 360;
    var s, sRange = 20, sDomain = 100;
    var l, lRange = 20, lDomain = 100;

    // Don't fluctuate color, sometimes.
    if (color === colors.unvisited) {
        return webColors.hsl(color);
    }

    h = randomInRangeInDomain(webColors.hue(color),        hRange, hDomain, true);
    s = randomInRangeInDomain(webColors.saturation(color), sRange, sDomain, false);
    l = randomInRangeInDomain(webColors.lightness(color),  lRange, lDomain, false);

    // Keep away from too white.
    l = l > 90 ? 90 : l;

    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

// Paint to the canvas.
function paint(canvas, color, x, y, width, height) {
    canvas.fillStyle = color;
    canvas.fillRect(x, y, width, height);
}

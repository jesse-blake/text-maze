'use strict';

var utils        = require('../utils');
var controlsView = require('../controls/view');
var webColors    = require('./web-colors');

// Paint a single location or all locations in the maze.
module.exports = {

    // Paint the entire maze.
    all: function(maze, canvas, state) {
        var x, y;

        var width  = state.maxMazeWidth * state.locationSize;
        var height = maze.length  * state.locationSize;

        // Get random colors to paint with if configured to do so.
        if (state.colors.randomize) {
            state.colors.text     = webColors.randomBrightWebColor();
            state.colors.solution = state.colors.text;

            controlsView.colorSpeedMeter(state, null);
        }

        // White-wash the canvas.
        paint(canvas, state.colors.unvisited, 0, 0, width, height);

        for (y = 0; y < maze.length; y++) {
            for (x = 0; x < maze[y].length; x++) {
                // Paint one location.
                this.one(maze, canvas, state, x, y);
            }
        }
    },

    // Paint a single location in the maze.
    one: function(maze, canvas, state, x, y) {
        var colors = state.colors;
        var ls     = state.locationSize;
        var clr;

        // Half border: half the width of the maze's borders.
        var hb = 1;

        // Old half border: changed based on location size.
        // var hb = Math.floor(ls / 6) || 1;

        // Text margin: margin between the text and borders.
        var tm = ls < 10 ? 0 : Math.floor(ls / 5) - 1;

        if (onPath(maze, x, y)) {

            clr = 'black';

            // Paint borders: top/right/bottom/left.
            if (!onPath(maze, x, y-1)) {
                paint(canvas, clr, x*ls-hb, y*ls-hb, ls+2*hb, 2*hb);
            }
            if (!onPath(maze, x+1, y)) {
                paint(canvas, clr, x*ls+ls-hb, y*ls-hb, 2*hb, ls+2*hb);
            }
            if (!onPath(maze, x, y+1)) {
                paint(canvas, clr, x*ls-hb, y*ls+ls-hb, ls+2*hb, 2*hb);
            }
            if (!onPath(maze, x-1, y)) {
                paint(canvas, clr, x*ls-hb, y*ls-hb, 2*hb, ls+2*hb);
            }

            // Paint background, solve, and backtrack lines: top/right/bottom/left/middle.
            if (onPath(maze, x, y-1)) {
                clr = getConnectingColor(maze, colors, x, y-1, maze[y][x].color);
                clr = fluctuateColor(clr, colors);
                paint(canvas, clr, x*ls+hb+tm, y*ls, ls-2*hb-2*tm, hb+tm);
            }
            if (onPath(maze, x+1, y)) {
                clr = getConnectingColor(maze, colors, x+1, y, maze[y][x].color);
                clr = fluctuateColor(clr, colors);
                paint(canvas, clr, x*ls+ls-hb-tm, y*ls+hb+tm, hb+tm, ls-2*hb-2*tm);
            }
            if (onPath(maze, x, y+1)) {
                clr = getConnectingColor(maze, colors, x, y+1, maze[y][x].color);
                clr = fluctuateColor(clr, colors);
                paint(canvas, clr, x*ls+hb+tm, y*ls+ls-hb-tm, ls-2*hb-2*tm, hb+tm);
            }
            if (onPath(maze, x-1, y)) {
                clr = getConnectingColor(maze, colors, x-1, y, maze[y][x].color);
                clr = fluctuateColor(clr, colors);
                paint(canvas, clr, x*ls, y*ls+hb+tm, hb+tm, ls-2*hb-2*tm);
            }
            clr = maze[y][x].color;
            clr = fluctuateColor(clr, colors);
            paint(canvas, clr, x*ls+hb+tm, y*ls+hb+tm, ls-2*hb-2*tm, ls-2*hb-2*tm);

            // Paint text: top/right/bottom/left/middle.
            if (state.currentlyShowingText && isCharacter(maze, x, y)) {

                if (isCharacter(maze, x, y-1)) {
                    clr = fluctuateColor(colors.text, colors);
                    paint(canvas, clr, x*ls+hb+tm,    y*ls,          ls-2*hb-2*tm, hb+tm);
                }
                if (isCharacter(maze, x+1, y)) {
                    clr = fluctuateColor(colors.text, colors);
                    paint(canvas, clr, x*ls+ls-hb-tm, y*ls+hb+tm,    hb+tm,        ls-2*hb-2*tm);
                }
                if (isCharacter(maze, x, y+1)) {
                    clr = fluctuateColor(colors.text, colors);
                    paint(canvas, clr, x*ls+hb+tm,    y*ls+ls-hb-tm, ls-2*hb-2*tm, hb+tm);
                }
                if (isCharacter(maze, x-1, y)) {
                    clr = fluctuateColor(colors.text, colors);
                    paint(canvas, clr, x*ls,          y*ls+hb+tm,    hb+tm,        ls-2*hb-2*tm);
                }
                clr = fluctuateColor(colors.text, colors);
                paint(canvas, clr, x*ls+hb+tm, y*ls+hb+tm, ls-2*hb-2*tm, ls-2*hb-2*tm);
            }

            // Paint start and end openings.
            clr = state.colors.unvisited;
            paint(canvas, clr, state.endpoints.start.x*ls-hb,  state.endpoints.start.y*ls-hb, 2*hb, ls+2*hb);
            paint(canvas, clr, state.endpoints.end.x*ls+ls-hb, state.endpoints.end.y*ls-hb,   2*hb, ls+2*hb);
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
    if (!colors.fluctuate || color === colors.unvisited) {
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

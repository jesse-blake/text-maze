'use strict';

var utils     = require('../../utilities');
var mazeChars = require('../maze-characters');

// Creates a bit array for each space Character in the maze indicating
// which locations in the space are connected as a path in the maze.
module.exports = function(maze, charlist) {

    var i, j;
    
    // Coordinates for the current space Character.
    var x, y;

    // Locations in the space Character from loIdx to hiIdx indicate which part
    // of the space Character is connected in the maze. This span, from low
    // to high, intersects all connections coming into the space Character.
    var loIdx, hiIdx;

    var charHgt = mazeChars.getCharHeight();

    // Helper when building the bit array after low and high indices are found.
    var bit;

    // '1' indicates a location in a space Character connected in the maze.
    var bitarray;

    // Helper when building the bit array.
    var stop;

    // Create a bit array for each space Character.
    for (i = 0; i < charlist.length; i++) {
        if (charlist[i].ch === ' ') {
            
            // Set the coordinates for the current space Character.
            x = charlist[i].topLeftX;
            y = charlist[i].topLeftY;

            loIdx = null;
            hiIdx = null;

            // Examine each location in the space Character to determine if it is connected
            // as a path in the maze.
            for (j = 0; j < charHgt; j++) {

                switch (true) {

                    // The top location in the space is connected from above, left or right.
                    case j === 0 && (maze[y-1][x] === 43 || maze[y+j][x-1] === 43 || maze[y+j][x+1] === 43):
                        loIdx = j;
                        break;

                    // The current location in the space is connected from both left and right.
                    case maze[y+j][x-1] === 43 && maze[y+j][x+1] === 43:
                        if (loIdx === null) {
                            loIdx = j;
                            hiIdx = j;
                        }
                        else {
                            hiIdx = j;
                        }
                        break;

                    // The current location in the space is connected from either the left or right.
                    case maze[y+j][x-1] === 43 || maze[y+j][x+1] === 43:
                        if (loIdx === null) {
                            loIdx = j;
                        }
                        else {
                            hiIdx = j;
                        }
                        break;

                    // The bottom location in the space is connected from below.
                    case j === charHgt-1 && maze[y+j+1][x] === 43:
                        if (loIdx === null) {
                            loIdx = j;
                        }
                        else {
                            hiIdx = j;
                        }
                        break;
                }
            }

            bitarray = [];

            // At least two connections were made into the space, so connect from low
            // to high in the space as a path in the maze, to connect these connections.
            if (loIdx !== null && hiIdx !== null) {
                for (j = 0; j < charHgt; j++) {
                    if (j >= loIdx && j <= hiIdx) {
                        bitarray.push(1);
                    }
                    else {
                        bitarray.push(0);
                    }
                }
            }

            // Only one connection was made into the space, so the space is a dead
            // end in the maze. Randomly choose some part of the space beginning
            // from the connection point to connect as a path in the maze.
            // i.e. set '1' in the bit array, from loIdx to some other randomish index.
            else if (loIdx !== null) {

                switch (loIdx) {

                    // Connect from the top of the space to some random location lower
                    // in the space.
                    case 0:
                        bit = 1;
                        stop = utils.randomInRange(2, charHgt-1);

                        for (j = 0; j <= charHgt-1; j++) {
                            if (j === stop) {
                                bit = 0;
                            }
                            bitarray.push(bit);
                        }
                        break;

                    // Connect from the bottom of the space to some random location
                    // higher in the space.
                    case charHgt - 1:
                        bit = 1;
                        stop = utils.randomInRange(0, charHgt-3);

                        for (j = charHgt-1; j >= 0; j--) {
                            if (j === stop) {
                                bit = 0;
                            }
                            bitarray.unshift(bit);
                        }
                        break;

                    // Connect from loIdx to the bottom of the space.
                    case Math.random() > 0.5:
                        bit = 0;
                        for (j = 0; j < charHgt-1; j++) {
                            if (j === loIdx) {
                                bit = 1;
                            }
                            bitarray.push(bit);
                        }
                        break;

                    // Connect from loIdx to the top of the space.
                    default:
                        bit = 0;
                        for (j = charHgt-1; j >= 0; j--) {
                            if (j === loIdx) {
                                bit = 1;
                            }
                            bitarray.unshift(bit);
                        }
                }
            }

            // Store the bit array in its space Character.
            maze[y][x].bitarray = bitarray;
        }
    }
};

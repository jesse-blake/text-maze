'use strict';

var utils    = require('../../utils');
var CharMaps = require('../CharacterMaps');

// Creates a connection array for each space Character in the maze that indicates
// which locations in the space are to be considered connected as a path
// in the maze.
module.exports = function(maze, charlist) {

    var i, j;
    
    // Coordinates for the current space Character.
    var x, y;

    // Locations in the space Character from loIdx to hiIdx indicate which part
    // of the space Character is connected in the maze. This span, from low
    // to high, intersects all connections coming into the space Character.
    var loIdx, hiIdx;

    var charHgt = CharMaps.getCharHeight();

    // Helper when building the connection array after low and high indices are found.
    var connect;

    // 'true' indicates a location in a space Character connected in the maze.
    var connections;

    // Helper when building the connection array.
    var stop;

    // Create a connection array for each space Character.
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
                    case j === 0 && (maze[y-1][x].connected || maze[y+j][x-1].connected || maze[y+j][x+1]):
                        loIdx = j;
                        break;

                    // The current location in the space is connected from both left and right.
                    case maze[y+j][x-1].connected && maze[y+j][x+1].connected:
                        if (loIdx === null) {
                            loIdx = j;
                            hiIdx = j;
                        }
                        else {
                            hiIdx = j;
                        }
                        break;

                    // The current location in the space is connected from either the left or right.
                    case maze[y+j][x-1].connected || maze[y+j][x+1].connected:
                        if (loIdx === null) {
                            loIdx = j;
                        }
                        else {
                            hiIdx = j;
                        }
                        break;

                    // The bottom location in the space is connected from below.
                    case j === charHgt-1 && maze[y+j+1][x].connected:
                        if (loIdx === null) {
                            loIdx = j;
                        }
                        else {
                            hiIdx = j;
                        }
                        break;
                }
            }

            connections = [];

            // At least two connections were made into the space, so connect from low
            // to high in the space as a path in the maze, to connect these connections.
            if (loIdx !== null && hiIdx !== null) {
                for (j = 0; j < charHgt; j++) {
                    if (j >= loIdx && j <= hiIdx) {
                        connections.push(true);
                    }
                    else {
                        connections.push(false);
                    }
                }
            }

            // Only one connection was made into the space, so the space is a dead
            // end in the maze. Randomly choose some part of the space beginning
            // from the connection point to connect as a path in the maze.
            // i.e. set 'true' in the connection array, from loIdx to some other
            // randomish index.
            else if (loIdx !== null) {

                switch (true) {

                    // Connect from the top of the space to some random location lower
                    // in the space.
                    case loIdx === 0:
                        connect = true;
                        stop = utils.randomInRange(2, charHgt-1);

                        for (j = 0; j < charHgt; j++) {
                            if (j === stop) {
                                connect = false;
                            }
                            connections.push(connect);
                        }
                        break;

                    // Connect from the bottom of the space to some random location
                    // higher in the space.
                    case loIdx === charHgt - 1:
                        connect = true;
                        stop = utils.randomInRange(0, charHgt-3);

                        for (j = charHgt-1; j >= 0; j--) {
                            if (j === stop) {
                                connect = false;
                            }
                            connections.unshift(connect);
                        }
                        break;

                    // Connect from loIdx to the bottom of the space.
                    case Math.random() > 0.5:
                        connect = false;
                        for (j = 0; j < charHgt; j++) {
                            if (j === loIdx) {
                                connect = true;
                            }
                            connections.push(connect);
                        }
                        break;

                    // Connect from loIdx to the top of the space.
                    default:
                        connect = false;
                        for (j = charHgt-1; j >= 0; j--) {
                            if (j === loIdx) {
                                connect = true;
                            }
                            connections.unshift(connect);
                        }
                }
            }

            // No other Characters connected to this space.
            else {
                connections = [0,0,0,0,0];
            }

            // Store the connection array in its corresponding space Character.
            maze[y][x].spaceCharConnectionArray = connections;
        }
    }
};

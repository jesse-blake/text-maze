'use strict';

var breakTextIntoLines = require('./build-maze/break-text-into-lines');

module.exports = function(text, maxMazeWidth, componentSize) {
    var lines = breakTextIntoLines(text, maxMazeWidth, componentSize);

    for (var i = 0; i < lines.length; i++) {
        console.log(lines[i]);
    }

    var maze = [
        [
            {onPath: true},
            {onPath: true},
            {onPath: false}
        ],[
            {onPath: false},
            {onPath: true},
            {onPath: false}
        ],[
            {onPath: true},
            {onPath: true},
            {onPath: false}
        ],[
            {onPath: true},
            {onPath: false},
            {onPath: false}
        ],[
            {onPath: true},
            {onPath: true},
            {onPath: true}
        ]
    ];

    return maze;
};

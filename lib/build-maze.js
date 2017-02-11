'use strict';

module.exports = function(maze) {
    var components = [
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

    return components;
};

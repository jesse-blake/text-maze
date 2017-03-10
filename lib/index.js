'use strict';

// Polyfill some ES6 features.
require('./polyfill');

var load   = require('./load');
var build  = require('./build/index');
var paint  = require('./paint');

module.exports = {

    init: function(text, opts) {

        this.state  = load.state(text, opts);
        this.maze   = build(this.state);
        this.canvas = load.canvas(this.maze, this.state);

        load.controls(this.maze, this.canvas, this.state);

        paint.all(this.maze, this.canvas, this.state);
    }
};

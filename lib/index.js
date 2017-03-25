'use strict';

// Polyfill some ES6 features.
require('./polyfill');

var load     = require('./load');
var build    = require('./build');
var paint    = require('./paint');
var controls = require('./controls');
var view     = require('./view');

module.exports = {

    init: function(text, opts) {

        this.state  = load.state(text, opts);

        this.maze   = build(this.state);

        this.canvas = load.canvas(this.maze, this.state);

        controls.init(this.maze, this.canvas, this.state);

        view.setMazeTopMargin(this.state.mazeMargin);

        paint.all(this.maze, this.canvas, this.state);
    }
};

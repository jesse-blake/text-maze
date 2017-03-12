'use strict';

// Polyfill some ES6 features.
require('./polyfill');

var load     = require('./load');
var build    = require('./build/index');
var paint    = require('./paint');
var controls = require('./controls');

module.exports = {

    init: function(text, opts) {

        this.state  = load.state(text, opts);

        this.maze   = build(this.state);

        this.canvas = load.canvas(this.maze, this.state);

        controls.init(this.maze, this.canvas, this.state);

        tweakView(this.state.mazeMargin);

        paint.all(this.maze, this.canvas, this.state);
    }
};

function tweakView(mazeMargin) {
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var mazeMenu     = document.getElementById('maze-menu');

    document.getElementById('text-maze').style.marginTop = ((windowHeight - mazeMenu.scrollHeight) * mazeMargin / 2) + 'px';
}

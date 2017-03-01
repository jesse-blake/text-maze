'use strict';

var load   = require('./load');
var build  = require('./build/index');
var paint  = require('./paint');
var listen = require('./listen');

module.exports = {

    init: function(text, opts) {

        this.state  = load.opts(text, opts);
        this.maze   = build(this.state);
        this.canvas = load.canvas(this.maze, this.state);

        paint.all(this.maze, this.canvas, this.state);

        listen(this.maze, this.canvas, this.state);
    }
};

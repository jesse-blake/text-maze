'use strict';

var utils = require('../utilities');

// The prototype for objects in locations in the maze that are
// non-character locations.
module.exports = {
    
    init: function() {
        this.connected = utils.unconnected;
    },

    getColor: function(x, y) {
        return this.connected ? utils.colors.connectedLight : utils.colors.unconnected;
    }
};

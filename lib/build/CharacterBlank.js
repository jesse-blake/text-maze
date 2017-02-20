'use strict';

var utils = require('../utils');

// For locations in the maze that aren't positions of a Character.
module.exports = {
    
    init: function() {
        this.connected = utils.unconnected;
    },

    getColor: function(x, y) {
        return this.connected ? utils.colors.connectedLight : utils.colors.unconnected;
    }
};

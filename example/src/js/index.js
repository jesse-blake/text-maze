'use strict';

require('../../node_modules/es5-shim/es5-shim');
require('../../node_modules/es5-shim/es5-sham');

var textMaze = require('text-maze');

textMaze.init({
    useSpeedMeter: true,
    fluctuateTextColor: true,
    fluctuateSolutionColor: true
});

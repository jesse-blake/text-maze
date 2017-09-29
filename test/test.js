'use strict';

const expect = require('chai').expect;
const utils  = require('../lib/utils');

describe('maze config: user params:', function() {

    const textMaze = require('text-maze');

    it('"text" is required and should be a non-zero length string', function() {
        expect(() => { textMaze.init(); }).to.throw(TypeError, 'option "text"');
        expect(() => { textMaze.init(43); }).to.throw(TypeError, 'option "text"');
        expect(() => { textMaze.init(''); }).to.throw(TypeError, 'option "text"');
    });
});

require('./utils/break-text-into-lines')();

require('./utils/char-maps.js')();

require('./utils/pad-lines')();

require('./utils/embed-text')();

require('./utils/Char')();

require('./utils/CharSide')();

require('./utils/connect-chars-horizontally')();

require('./utils/random-in-range')();

require('./utils/shuffle-array')();

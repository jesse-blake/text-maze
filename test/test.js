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

    it('"width" is required and should be a positive integer', function() {
        expect(() => { textMaze.init('foo'); }).to.throw(TypeError, 'option "width"');
        expect(() => { textMaze.init('foo', 'bar'); }).to.throw(TypeError, 'option "width"');
        expect(() => { textMaze.init('foo', -43); }).to.throw(TypeError, 'option "width"');
    });
});

require('./utils/break-text-into-lines')();

require('./utils/pad-lines')();

require('./utils/embed-text')();

require('./utils/random-in-range')();

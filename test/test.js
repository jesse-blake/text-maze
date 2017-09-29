'use strict';

const expect = require('chai').expect;
const utils  = require('../lib/utils');

describe('maze config: user params:', function() {

    const textMaze = require('text-maze');

    it('"text" is required and should be a non-zero length string', function() {
        expect(() => { textMaze.init(); }).to.throw(TypeError, 'arg "text"');
        expect(() => { textMaze.init(43); }).to.throw(TypeError, 'arg "text"');
        expect(() => { textMaze.init(''); }).to.throw(TypeError, 'arg "text"');
    });

    it('"options" must be an object or undefined', function() {
        expect(() => { textMaze.init('foo'); }).to.not.throw(TypeError, 'arg "options"');
        expect(() => { textMaze.init('foo', {}); }).to.not.throw(TypeError, 'arg "options"');

        expect(() => { textMaze.init('foo', true); }).to.throw(TypeError, 'arg "options"');
        expect(() => { textMaze.init('foo', 43); }).to.throw(TypeError, 'arg "options"');
        expect(() => { textMaze.init('foo', null); }).to.throw(TypeError, 'arg "options"');
    });

    it('"options" must fail on unrecognized options', function() {
        expect(() => { textMaze.init('foo', {foo: 43}); }).to.throw(TypeError, 'unrecognized option');
    });

    it('"options.width" must be a valid integer', function() {
        expect(() => { textMaze.init('foo', {width: 19}); }).to.throw(TypeError, 'option "width"');
        expect(() => { textMaze.init('foo', {width: null}); }).to.throw(TypeError, 'option "width"');
        expect(() => { textMaze.init('foo', {width: true}); }).to.throw(TypeError, 'option "width"');
        expect(() => { textMaze.init('foo', {width: 'foo'}); }).to.throw(TypeError, 'option "width"');
    });

    it('"options.margin" must be a valid integer', function() {
        // Not testing invalid integers: window.innerWidth is unavailable.
        expect(() => { textMaze.init('foo', {margin: null}); }).to.throw(TypeError, 'option "margin"');
        expect(() => { textMaze.init('foo', {margin: true}); }).to.throw(TypeError, 'option "margin"');
        expect(() => { textMaze.init('foo', {margin: 'foo'}); }).to.throw(TypeError, 'option "margin"');
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

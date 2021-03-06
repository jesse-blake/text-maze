'use strict';

// Classes

exports.Char = require('./Char');

exports.CharSide = require('./CharSide');

// Tools, ordered chronologically by when used.

exports.autoFit = require('./auto-fit');

exports.breakTextIntoLines = require('./break-text-into-lines');

exports.charWhitelist = require('./char-whitelist');

exports.charMaps = require('./char-maps.js');

exports.padLines = require('./pad-lines');

exports.embedText = require('./embed-text');

exports.connectChars = require('./connect-chars');

exports.findAdjacentChar = require('./find-adjacent-char');

exports.connectCharsHorizontally = require('./connect-chars-horizontally.js');

exports.connectCharsVertically = require('./connect-chars-vertically.js');

exports.connectSpaces = require('./connect-spaces');

exports.setEndpoints = require('./set-endpoints');

exports.flatten = require('./flatten');

exports.fillOut = require('./fill-out');

exports.solve = require('./solve');

exports.shuffleArray = require('./shuffle-array');

exports.randomInRange = require('./random-in-range');

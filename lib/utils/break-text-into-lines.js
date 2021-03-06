'use strict';

var utils = require('./index');

// Break the maze text into lines according to the maze's max width.
module.exports = function(text, width) {

    var i;

    // Array of strings, one string for each line.
    var lines = [''];

    // Restrict to a whitelist of characters, and split on a space.
    var words = utils.charMaps.cleanText(text).split(' ');

    // Number of maze cells the current word will require horizontally.
    var wordLen;

    // Max length, in maze cells, of a line of text in the maze.
    // Do not include maze border on either side (-2).
    var maxLineLen = width - 2;

    // Length, in maze cells, of word spacing.
    // Space char takes one cell, and it has a cell on either side.
    // TODO Global state: word spacing should be in global state.
    var wordSpacingLen = 3;

    // State shared with hyphenate function.
    var state = {

        // Number of maze cells the current word will require horizontally.
        currLineIdx: 0,

        // Current length, in maze cells, of the current line of text.
        lineLen: 0
    };

    for (i = 0; i < words.length; i++) {

        wordLen = getWordLength(words[i]);

        // If this is the very first word add it to the line, hyphenating if needed (special case).
        if (state.lineLen === 0) {
            if (wordLen > maxLineLen) {
                hyphenateWord(lines, words[i], state, maxLineLen);
            }
            else {
                lines[state.currLineIdx] += words[i];
                state.lineLen += wordLen;
            }
        }

        // If the current word fits on current line, add it to the line.
        else if (state.lineLen + wordSpacingLen + wordLen <= maxLineLen) {
            lines[state.currLineIdx] += ' ' + words[i];
            state.lineLen += wordSpacingLen + wordLen;
        }

        // TODO Hyphenate words if line still has lots of space but and current word won't fit.

        // If the current word fits on a new line, add it to a new line.
        else if (wordLen <= maxLineLen) {
            lines[++state.currLineIdx] = words[i];
            state.lineLen = wordLen;
        }

        // The current word doesn't fit on the current line or a new line, so hyphenate it.
        else {
            ++state.currLineIdx;
            hyphenateWord(lines, words[i], state, maxLineLen);
        }
    }

    return lines;
};

// Returns the number of maze cells the word will require horizontally in the maze
// including a single cell between each character.
function getWordLength(word) {
    var i, length = 0, wordChars = word.split('');

    // There will be one cell between each character in the maze.
    // TODO Global state: word spacing should be in global state.
    var charSpacing = 1;

    for (i = 0; i < wordChars.length; i++) {
        length += utils.charMaps.getLengthOfCharInMaze(wordChars[i]);

        // Add character spacing after each character but the last.
        if (i < wordChars.length - 1) {
            length += charSpacing;
        }
    }

    return length;
}

function hyphenateWord(lines, word, state, maxLineLen) {

    var i, chars = word.split('');

    // The length, in maze cells, the next character will require in the maze.
    var nextLen;

    // The current length of the front part of the hyphenated word.
    var length = 0;

    // The parts to the left (front) and right (back) of the hyphen.
    var front = '', back = '';

    var wordLen;

    // TODO Global state: word spacing should be in global state.
    var charSpacing = 1;

    for (i = 0; i < chars.length; i++) {

        nextLen = charSpacing + utils.charMaps.getLengthOfCharInMaze(chars[i]);

        // Break if char overflows the maze; account hyphen's character spacing.
        if (length + nextLen > maxLineLen - charSpacing - utils.charMaps.getLengthOfCharInMaze('-')) {
            break;
        }

        front += chars[i];
        length += nextLen;
    }

    // Throw an error if a character and a hyphen cannot fit in the width of the maze.
    if (front === '') {
        throw new Error('Hyphenation failed because maze width is too small');
    }

    // Add the front part to the current line.
    lines[state.currLineIdx] = front + '-';

    // The back part becomes the current word.
    back = word.slice(front.length);
    wordLen = getWordLength(back);

    // Hyphenate again if necessary, or just add the back part to a new line.
    if (wordLen > maxLineLen) {
        ++state.currLineIdx;
        hyphenateWord(lines, back, state, maxLineLen);
    }
    else {
        lines[++state.currLineIdx] = back;
        state.lineLen = wordLen;
    }
}

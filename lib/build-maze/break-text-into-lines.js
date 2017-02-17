'use strict';

var mazeChars = require('./maze-characters');

// Breaks the maze text into lines according to the maze's max width
module.exports = function(text, maxMazeWidth, locationSize) {

    // Returns the number of maze locations the word will require horizontally in the maze
    // including a single location between each character
    function getWordLength(word) {
        var i, length = 0, wordChars = word.split('');

        for (i = 0; i < wordChars.length; i++) {
            length += mazeChars.getLengthOfCharInMaze(wordChars[i]);

            // +1 for every character except the last to account for space between characters
            if (i < wordChars.length - 1) {
                length++;
            }
        }

        return length;
    }

    function hyphenateWord(lines, word, state, maxLineLen) {

        var i, chars = word.split('');

        // The length (in maze locations) the next character will require in the maze
        var nextLen;

        // The current length of the front part of the hyphenated word
        var length = 0;

        // The parts to the left (front) and right (back) of the hyphen
        var front = '', back = '';

        for (i = 0; i < chars.length; i++) {

            // Account for the space between this character and the next with +1
            nextLen = mazeChars.getLengthOfCharInMaze(chars[i]) + 1;

            // Break if char overflows the maze; account for the hyphen to be added with -1 
            if (length + nextLen > maxLineLen - 3) {
                break;
            }
            
            front += chars[i];
            length += nextLen;
        }

        // Add the front part to the current line
        lines[state.currLineIdx] = front + '-';

        // The back part becomes the current word
        back = word.slice(front.length);
        wordLen = getWordLength(back);

        // Hyphenate again if necessary, or just add the back part to a new line
        if (wordLen > maxLineLen) {
            ++state.currLineIdx;
            hyphenateWord(lines, back, state, maxLineLen);
        }
        else {
            lines[++state.currLineIdx] = back;
            state.lineLen = wordLen;
        }
    }


    var i;

    // Array of strings, one string for each line
    var lines = [''];

    // Restrict to a whitelist of characters, and split on a space
    var words = mazeChars.cleanText(text).split(' ');

    // Number of maze locations the current word will require horizontally
    var wordLen;
    
    // Max length (in maze locations) of a line of text in the maze
    var maxLineLen = maxMazeWidth / locationSize;

    // Length (in maze locations) of word spacing
    var wordSpacingLen = 4;

    // State shared with hyphenate function
    var state = {

        // Number of maze locations the current word will require horizontally
        currLineIdx: 0,

        // Current length (in maze locations) of the current line of text
        lineLen: 0
    };

    for (i = 0; i < words.length; i++) {

        wordLen = getWordLength(words[i]);

        // If this is the very first word add it to the line, hyphenating if needed (special case)
        if (state.lineLen === 0) {
            if (wordLen > maxLineLen) {
                hyphenateWord(lines, words[i], state, maxLineLen);
            }
            else {
                lines[state.currLineIdx] += words[i];
                state.lineLen += wordLen;
            }
        }

        // If the current word fits on current line, add it to the line
        else if (state.lineLen + wordSpacingLen + wordLen <= maxLineLen) {
            lines[state.currLineIdx] += ' ' + words[i];
            state.lineLen += wordSpacingLen + wordLen;
        }

        // TODO Hyphenate words when the line still has lots of space but yet the current word won't fit

        // If the current word fits on a new line, add it to a new line
        else if (wordLen <= maxLineLen) {
            lines[++state.currLineIdx] = words[i];
            state.lineLen = wordLen;
        }

        // The current word doesn't fit on the current line or a new line, so hyphenate it
        else {
            ++state.currLineIdx;
            hyphenateWord(lines, words[i], state, maxLineLen);
        }
    }

    return lines;
};

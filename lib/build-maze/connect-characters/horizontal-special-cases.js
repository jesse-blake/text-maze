'use strict';

// Returns the hardcoded special-case-connection bit array for leftChar
// connecting to rightChar, if it exists, otherwise returns null.
module.exports = function(leftChar, rightChar) {

    // All the hardcoded special cases.
    var cases = {
        'BT': [1,1,1,0,0],
        'B7': [1,1,1,0,0],
        'B?': [1,1,1,0,0],
        "B'": [0,1,1,0,0],
        'C-': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        'DI': function() {
            return Math.random() > 0.5 ? [1,1,0,0,0] : [0,0,0,1,1];
        },
        'DT': [1,1,0,0,0],
        'DZ': function() {
            return Math.random() > 0.5 ? [1,1,0,0,0] : [0,0,0,1,1];
        },
        'D7': [1,1,0,0,0],
        'D.': [0,0,0,1,1],
        'D?': [1,1,0,0,0],
        'FJ': [0,0,1,1,0],
        'F1': function() {
            return Math.random() > 0.33 ? [1,1,0,0,0]
                : Math.random() > 0.5 ? [0,1,1,0,0]
                    : [0,0,1,1,1];
        },
        'F.': [0,0,1,1,1],
        'I-': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        'K-': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,0];
        },
        'LT': [1,1,1,1,1],
        'LV': [0,0,0,1,1],
        'L4': [0,0,1,1,1],
        'L7': [1,1,1,1,1],
        'L9': [0,0,1,1,1],
        'L?': [1,1,1,1,1],
        'L-': [0,0,1,1,1],
        "L'": [0,1,1,1,1],
        "PJ": [0,0,1,1,0],
        'P.': [0,0,1,1,1],
        'QT': [1,1,1,1,1],
        'QV': [0,0,0,1,1],
        'Q4': [0,0,1,1,1],
        'Q7': [1,1,1,1,1],
        'Q9': [0,0,1,1,1],
        'Q?': [1,1,1,1,1],
        'Q-': [0,0,1,1,1],
        "Q'": [0,1,1,1,1],
        'RT': [1,1,1,1,0],
        'R4': [0,0,1,1,0],
        'R7': [1,1,1,1,0],
        'R9': [0,0,1,1,0],
        'R?': [1,1,1,1,0],
        'R-': [0,0,1,1,0],
        "R'": [0,1,1,1,0],
        'TJ': [1,1,1,1,0],
        'T1': [1,1,0,0,0],
        'T.': [1,1,1,1,1],
        'T-': [1,1,1,0,0],
        'V.': [0,0,0,1,1],
        'X-': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,0];
        },
        'Z-': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        '1T': [1,1,1,1,1],
        '1V': [0,0,0,1,1],
        '14': [0,0,1,1,1],
        '17': [1,1,1,1,1],
        '19': [0,0,1,1,1],
        '1?': [1,1,1,1,1],
        '1-': [0,0,1,1,1],
        "1'": [0,1,1,1,1],
        '51': [0,0,0,1,1],
        '5.': [0,0,0,1,1],
        '5-': [0,0,1,1,0],
        '.T': [1,1,1,1,1],
        '.V': [0,0,0,1,1],
        '.4': [0,0,1,1,1],
        '.7': [1,1,1,1,1],
        '.9': [0,0,1,1,1],
        '.?': [1,1,1,1,1],
        '.-': [0,0,1,1,1],
        ".'": [0,1,1,1,1],
        '?J': [0,0,1,1,0],
        '?.': [0,0,1,1,1],
        '-I': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        '-J': [0,0,1,1,0],
        '-T': [1,1,1,0,0],
        '-X': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,0];
        },
        '-Z': function() {
            return Math.random() > 0.5 ? [1,1,1,0,0] : [0,0,1,1,1];
        },
        '-1': function() {
            return Math.random() > 0.5 ? [0,1,1,0,0] : [0,0,1,1,1];
        },
        '-7': [1,1,1,0,0],
        '-.': [0,0,1,1,1],
        '-?': [1,1,1,0,0],
        "-'": [0,1,1,0,0],
        "'J": [0,1,1,1,0],
        "'.": [0,1,1,1,1],
        "'-": [0,1,1,0,0]
    };

    var result = null;

    // Create the index into the cases hash
    var specialCase = '' + leftChar.toUpperCase() + rightChar.toUpperCase();

    if (specialCase in cases) {
        result = (typeof cases[specialCase] === 'function') ? cases[specialCase]() : cases[specialCase];
    }

    return result;
};

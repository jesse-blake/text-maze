var mazeChars = require('./maze-characters');

// An object for each character in the maze to facilitate building the maze
module.exports = {

    init: function(ch, topLeftX, topLeftY) {

        // The ascii character this object represents
        this.ch = ch; 

        // The top left coordinates of this character in the maze
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;

        // True if this character itself has been connected in the maze yet
        this.connected = false;
    },

    // True if the given location within the character is part of the maze's path
    locationInCharIsOnPath: function(x, y) {

        // Convert the maze indices to indices into the character's map
        x = x - this.topLeftX;
        y = y - this.topLeftY;

        if (x >= 0 && 
            y >= 0 &&
            x < mazeChars.getLengthOfCharInMaze(this.ch) &&
            y < mazeChars.getCharHeight(this.ch)) {

            return !!(mazeChars.getBitAtLocationInChar(this.ch, x, y)); 
        }

        throw new Error('Invalid location for the given character.');
    }
};

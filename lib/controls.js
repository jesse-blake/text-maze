'use strict';

// Modify the html maze controls.
module.exports = {

    // Update the text of an element by its id.
    updateCtrlText: function(id, text) {
        document.getElementById(id).innerHTML = text;
    },

    // Show the button that resets the solve state.
    showSolveResetCtrl: function() {
        document.getElementById('solve-maze-reset-ctrl').style.display = 'inline';
    },

    // Hide the button that resets the solve state.
    hideSolveResetCtrl: function() {
        document.getElementById('solve-maze-reset-ctrl').style.display = 'none';
    }
};

'use strict';

// Utilities allowing the solve module to update relevant controls.
module.exports = {

    updateSolveCtrlText: function(text) {
        document.getElementById('maze-solve-ctrl').innerHTML = text;
    },

    updateShowSolutionCtrlText: function(text) {
        document.getElementById('maze-show-solution-ctrl').innerHTML = text;
    },

    // @param ctrl: One of: start stop continue reset
    enableSolveCtrl: function(ctrl) {
        document.getElementById('maze-solve-' + ctrl + '-ctrl').removeAttribute('disabled');
    },

    // @param ctrl: One of: start stop continue reset
    disableSolveCtrl: function(ctrl) {
        document.getElementById('maze-solve-' + ctrl + '-ctrl').setAttribute('disabled', 'disabled');
    }
};

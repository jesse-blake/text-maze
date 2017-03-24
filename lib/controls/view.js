'use strict';

var utils = require('../utils');

// Utilities allowing the solve module to update relevant controls.
module.exports = {

    updateShowingSolutionCtrl: function(state) {
        if (state.currentlyShowingSolution) {
            document.getElementById('maze-show-solution-label').style.display = 'none';
            document.getElementById('maze-hide-solution-label').style.display = 'inline';
        }
        else {
            document.getElementById('maze-show-solution-label').style.display = 'inline';
            document.getElementById('maze-hide-solution-label').style.display = 'none';
        }
    },

    updateShowingTextCtrl: function(state) {
        if (state.currentlyShowingText) {
            document.getElementById('maze-show-text-label').style.display = 'none';
            document.getElementById('maze-hide-text-label').style.display = 'inline';
        }
        else {
            document.getElementById('maze-show-text-label').style.display = 'inline';
            document.getElementById('maze-hide-text-label').style.display = 'none';
        }
    },

    disableCtrl: function(ctrlId) {
        document.getElementById(ctrlId).setAttribute('disabled', 'disabled');
    },

    enableCtrl: function(ctrlId) {
        document.getElementById(ctrlId).removeAttribute('disabled');
    },

    toggleShowingText: function() {
        document.getElementById('maze-show-text-ctrl').click();
    },

    toggleShowingSolution: function() {
        document.getElementById('maze-show-solution-ctrl').click();
    },

    clearTextInput: function() {
        document.getElementById('maze-text-input-ctrl').value = '';
    },

    updateSpeedCtrls: function(state) {
        switch (state.solve.speed) {
            case 1:
                document.getElementById('maze-decrease-speed-ctrl').setAttribute('disabled', 'disabled');
                document.getElementById('maze-increase-speed-ctrl').removeAttribute('disabled');
                break;
            case state.solve.animationDelays.length:
                document.getElementById('maze-decrease-speed-ctrl').removeAttribute('disabled');
                document.getElementById('maze-increase-speed-ctrl').setAttribute('disabled', 'disabled');
                break;
            default:
                document.getElementById('maze-decrease-speed-ctrl').removeAttribute('disabled');
                document.getElementById('maze-increase-speed-ctrl').removeAttribute('disabled');
        }
    },

    // Works with bootstrap in btn-group.
    injectSpeedMeter: function(state) {
        var i, newNode, parentNode, childNode;

        if (state.useSpeedMeter) {
            childNode = document.getElementById('maze-increase-speed-ctrl');

            if (childNode) {
                for (i = 0; i < state.solve.animationDelays.length; i++) {
                    newNode = document.createElement('div');
                    newNode.id = 'maze-meter-' + (i + 1);
                    newNode.className = 'maze-meter btn btn-default';
                    newNode.setAttribute('disabled', 'disabled');
                    newNode.innerHTML = '&nbsp;';
                    childNode.parentNode.insertBefore(newNode, childNode);
                }
            }
        }
    },

    // @param color: (optional) Set to null if not specifying; state.colors.solution will be used.
    // @param prevSpeed: (optional) The previous speed, so that that location in the meter
    // can be uncolored.
    colorSpeedMeter: function(state, color, speed, prevSpeed) {
        if (state.useSpeedMeter) {

            if (color) {
                document.getElementById('maze-meter-' + speed).style.backgroundColor = color;
            }
            else {
                document.getElementById('maze-meter-' + speed).style.backgroundColor = state.colors.solution;
            }

            if (prevSpeed) {
                document.getElementById('maze-meter-' + prevSpeed).style.backgroundColor = state.colors.unvisited;
            }
        }
    },

    updateSizeCtrls: function(state) {
        if (state.locationSize === utils.minLocationSize) {
            document.getElementById('maze-decrease-size-ctrl').setAttribute('disabled', 'disabled');
        }
        else {
            document.getElementById('maze-decrease-size-ctrl').removeAttribute('disabled');
        }

        if (state.locationSize === utils.maxLocationSize(state)) {
            document.getElementById('maze-increase-size-ctrl').setAttribute('disabled', 'disabled');
        }
        else {
            document.getElementById('maze-increase-size-ctrl').removeAttribute('disabled');
        }

        if (state.locationSize === state.autoFittedLocationSize) {
            document.getElementById('maze-auto-size-ctrl').setAttribute('disabled', 'disabled');
        }
        else {
            document.getElementById('maze-auto-size-ctrl').removeAttribute('disabled');
        }
    }
};

'use strict';

var utils = require('../utils');

// Utilities allowing the solve module to update relevant controls.
module.exports = {

    updateShowingSolutionCtrl: function(state) {
        if (state.solve.showingSolution) {
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

    // @param oldSpeed: (optional) Set to null if just updating meter color, or set to the previous
    // speed when the speed is changed to uncolor the previous speed's location in the meter.
    colorSpeedMeter: function(state, prevSpeed) {
        var i, speed;

        if (state.useSpeedMeter) {
            speed = state.solve.speed;

            if (state.currentlyShowingText) {
                document.getElementById('maze-meter-' + speed).style.backgroundColor = state.colors.text;
            }
            else if (state.solve.showingSolution || state.solve.running) {
                document.getElementById('maze-meter-' + speed).style.backgroundColor = state.colors.solution;
            }
            else {
                document.getElementById('maze-meter-' + speed).style.backgroundColor = 'black';
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

'use strict';

var utils = require('../utils');

// Utilities allowing the solve module to update relevant controls.
module.exports = {

    hideControlById: function(id) {
        document.getElementById(id).style.display = 'none';
    },

    disableCtrlById: function(id) {
        var ctrl = document.getElementById(id);

        ctrl.setAttribute('disabled', 'disabled');

        // Add disabled class and clean up spaces.
        if (!ctrl.className.match(/disabled/)) {
            ctrl.className = (ctrl.className + ' disabled').replace(/(^\s+|\s+$)/, '');
        }
    },

    enableCtrlById: function(id) {
        var ctrl = document.getElementById(id);

        ctrl.removeAttribute('disabled');

        if (ctrl.className.match(/disabled/)) {
            // Remove disabled and needless spaces.
            ctrl.className = ctrl.className.replace(/disabled/, '').replace(/\s{2,}/, ' ').replace(/(^\s+|\s+$)/, '');
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

    updateFluctuateTextColorCtrl: function(state) {
        if (state.colors.fluctuateTextColor) {
            document.getElementById('maze-fluctuate-text-color-checked').style.display = 'inherit';
            document.getElementById('maze-fluctuate-text-color-unchecked').style.display = 'none';
        }
        else {
            document.getElementById('maze-fluctuate-text-color-checked').style.display = 'none';
            document.getElementById('maze-fluctuate-text-color-unchecked').style.display = 'inherit';
        }
    },

    updateFluctuateSolutionColorCtrl: function(state) {
        if (state.colors.fluctuateSolutionColor) {
            document.getElementById('maze-fluctuate-solution-color-checked').style.display = 'inherit';
            document.getElementById('maze-fluctuate-solution-color-unchecked').style.display = 'none';
        }
        else {
            document.getElementById('maze-fluctuate-solution-color-checked').style.display = 'none';
            document.getElementById('maze-fluctuate-solution-color-unchecked').style.display = 'inherit';
        }
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
                this.disableCtrlById('maze-decrease-speed-ctrl');
                this.enableCtrlById('maze-increase-speed-ctrl');
                break;
            case state.solve.animationDelays.length:
                this.enableCtrlById('maze-decrease-speed-ctrl');
                this.disableCtrlById('maze-increase-speed-ctrl');
                break;
            default:
                this.enableCtrlById('maze-decrease-speed-ctrl');
                this.enableCtrlById('maze-increase-speed-ctrl');
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

    // @param prevSpeed: (optional) The previous speed, so that that location in the meter
    // can be uncolored.
    updateSpeedMeter: function(state, speed, prevSpeed) {
        if (state.useSpeedMeter) {
            document.getElementById('maze-meter-' + speed).style.backgroundColor = 'black';

            if (prevSpeed) {
                document.getElementById('maze-meter-' + prevSpeed).style.backgroundColor = 'white';
            }
        }
    },

    updateSizeCtrls: function(state) {
        if (state.locationSize === utils.minLocationSize) {
            this.disableCtrlById('maze-decrease-size-ctrl');
        }
        else {
            this.enableCtrlById('maze-decrease-size-ctrl');
        }

        if (state.locationSize === utils.maxLocationSize(state)) {
            this.disableCtrlById('maze-increase-size-ctrl');
        }
        else {
            this.enableCtrlById('maze-increase-size-ctrl');
        }

        if (state.locationSize === state.autoFittedLocationSize) {
            this.disableCtrlById('maze-auto-size-ctrl');
        }
        else {
            this.enableCtrlById('maze-auto-size-ctrl');
        }
    },

    // Stop bootstrap dropdowns from closing automatically.
    configureBootstrapDropdowns: function(addListener) {
        var i, dropdowns = document.getElementsByClassName('dropdown-menu');

        if (dropdowns.length) {
            for (i = 0; i < dropdowns.length; i++) {
                addListener('click', dropdowns[i], function(evt) {
                    evt.stopPropagation();
                });
            }
        }
    }
};

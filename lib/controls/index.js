'use strict';

var utils    = require('../utils');
var load     = require('../load/index');
var build    = require('../build/index');
var CharMaps = require('../build/CharacterMaps');
var paint    = require('../paint/index');
var solve    = require('../solve');
var view     = require('./view');

module.exports = {

    // Initialize controls and register control listeners.
    init: function(maze, canvas, state) {

        var ctrls = {

            // Rebuild the maze with current text.
            'maze-rebuild-ctrl': {
                action: function(evt) {
                    maze = rebuild(maze, canvas, state);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Toggle showing/hiding maze text.
            'maze-show-text-ctrl': {
                init: function() {
                    view.updateShowingTextCtrl(state);
                },
                action: function(evt) {
                    if (state.solve.showingSolution) {
                        view.toggleShowingSolution();
                    }
                    state.currentlyShowingText = !state.currentlyShowingText;
                    view.updateShowingTextCtrl(state, ctrls);
                    solve.run(maze, canvas, state, true);
                    paint.all(maze, canvas, state);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // To ensure elements exist with these ids.
            'maze-show-text-label': {},
            'maze-hide-text-label': {},

            // Toggle showing/hiding maze solution.
            'maze-show-solution-ctrl': {
                init: function() {
                    view.updateShowingSolutionCtrl(state);
                },
                action: function(evt) {
                    if (state.currentlyShowingText) {
                        view.toggleShowingText();
                    }
                    view.updateShowingSolutionCtrl(state);
                    solve.show(maze, canvas, state);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // To ensure elements exist with these ids.
            'maze-show-solution-label': {},
            'maze-hide-solution-label': {},

            // Start solve animation.
            'maze-solve-start-ctrl': {
                action: function(evt) {
                    if (state.currentlyShowingText) {
                        view.toggleShowingText();
                    }
                    solve.run(maze, canvas, state, false);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Pause solve animation.
            'maze-solve-pause-ctrl': {
                init: function() {
                    view.disableCtrl('maze-solve-pause-ctrl');
                },
                action: function(evt) {
                    solve.run(maze, canvas, state, false);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Reset solve animation.
            'maze-solve-reset-ctrl': {
                init: function() {
                    view.disableCtrl('maze-solve-reset-ctrl');
                },
                action: function(evt) {
                    solve.run(maze, canvas, state, true);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Decrease solve animation speed.
            'maze-decrease-speed-ctrl': {
                action: function(evt) {
                    adjustSpeed(maze, canvas, state, ctrls, state.solve.speed - 1, state.solve.speed);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Increase solve animation speed.
            'maze-increase-speed-ctrl': {
                init: function() {
                    view.injectSpeedMeter(state);
                    view.colorSpeedMeter(state);
                },
                action: function(evt) {
                    adjustSpeed(maze, canvas, state, ctrls, state.solve.speed + 1, state.solve.speed);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Decrease size of paths in maze.
            'maze-decrease-size-ctrl': {
                action: function(evt) {
                    var size = state.locationSize - 1;

                    if (size >= utils.minLocationSize && size <= utils.maxLocationSize(state)) {
                        load.setLocationSize(state, size);
                        maze = rebuild(maze, canvas, state);
                        view.updateSizeCtrls(state);
                    }
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Increase size of paths in maze.
            'maze-increase-size-ctrl': {
                action: function(evt) {
                    var size = state.locationSize + 1;

                    if (size >= utils.minLocationSize && size <= utils.maxLocationSize(state)) {
                        load.setLocationSize(state, size);
                        maze = rebuild(maze, canvas, state);
                        view.updateSizeCtrls(state);
                    }
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Fit maze to screen.
            'maze-auto-size-ctrl': {
                init: function() {
                    view.disableCtrl('maze-auto-size-ctrl');
                },
                action: function(evt) {
                    load.autoSetLocationSize(state);
                    maze = rebuild(maze, canvas, state);
                    view.updateSizeCtrls(state);
                    stopDefault(evt);
                },
                type: 'click'
            },

            // Rebuild the maze with user supplied text.
            'maze-text-input-ctrl': {
                init: function() {
                    var input = document.getElementById('maze-text-input-ctrl');
                    var reset = document.getElementById('maze-reset-ctrl');

                    input.oninput = function() {

                        // Enable the reset button even for blacklisted text.
                        if (input.value) {
                            view.enableCtrl('maze-reset-ctrl');
                        }
                        else {
                            view.disableCtrl('maze-reset-ctrl');
                        }

                        // Clean the text with CharMaps whitelist function.
                        var text = CharMaps.cleanText(input.value);

                        // Clear the previous timeout, if there was one, because more
                        // input has arrived.
                        clearTimeout(state.changeTextRebuildTimeout);

                        // Use timeouts so each keystroke doesn't start an expensive rebuild.
                        if (text) {
                            state.changeTextRebuildTimeout = setTimeout(function() {
                                state.text = input.value;
                                load.autoSetLocationSize(state);
                                maze = rebuild(maze, canvas, state);
                                view.updateSizeCtrls(state);
                            }, 300);
                        }
                    };

                    input.onpropertychange = input.oninput;

                    addListener('keypress', input, function(evt) {
                        if (evt.keyCode == 13) {
                            stopDefault(evt);
                        }
                    });
                }
            },

            // Reset to original text.
            'maze-reset-ctrl': {
                init: function() {
                    view.disableCtrl('maze-reset-ctrl');
                },
                action: function(evt) {
                    state.text = state.originalText;
                    load.autoSetLocationSize(state);
                    maze = rebuild(maze, canvas, state);

                    view.clearTextInput();
                    view.updateSizeCtrls(state);
                    view.disableCtrl('maze-reset-ctrl');

                    stopDefault(evt);
                },
                type: 'click'
            }
        };

        var id, e, c;

        // Ensure control elements are present; initialize if required.
        for (id in ctrls) {
            e = document.getElementById(id);

            if (e) {
                c = ctrls[id];
                if (c.hasOwnProperty('init')) {
                    c.init();
                }
            }
            else {
                throw new Error("No element found with id '" + id + "'");
            }
        }

        // Register listeners for controls.
        for (id in ctrls) {
            e = document.getElementById(id);
            c = ctrls[id];

            if (c.hasOwnProperty('action') && c.hasOwnProperty('type')) {
                addListener(c.type, e, c.action.bind(ctrls));
            }
            else if (c.hasOwnProperty('action')) {
                c.action.bind(ctrls)();
            }
        }

        // Add window resize listener to rebuild when window size changes.
        addListener('resize', window, function(evt) {
            clearTimeout(state.changeWindowSizeRebuildTimeout);

            state.changeWindowSizeRebuildTimeout = setTimeout(function() {
                load.autoSetLocationSize(state);
                maze = rebuild(maze, canvas, state);
                view.updateSizeCtrls(state);
            }, 300);

            stopDefault(evt);
        });
    }
};

function adjustSpeed(maze, canvas, state, ctrls, speed, prevSpeed) {
    var continueRunning = false;

    // Stop solving if solving.
    if (state.solve.running) {
        solve.run(maze, canvas, state);
        continueRunning = true;
    }

    if (speed >= 1 && speed <= state.solve.animationDelays.length) {
        state.solve.speed = speed;
        view.updateSpeedCtrls(state);
        view.colorSpeedMeter(state, prevSpeed);
    }

    // Continue solving if soving was stopped.
    if (continueRunning) {
        solve.run(maze, canvas, state);
    }
}

// Rebuild the maze from scratch.
function rebuild(maze, canvas, state) {

    // First reset the solve module's state.
    solve.run(maze, canvas, state, true);

    maze = build(state);
    load.canvas(maze, state);
    paint.all(maze, canvas, state);

    return maze;
}

// IE compatible prevent default.
function stopDefault(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
}

// Use IE event listeners instead, when required.
function addListener(type, elem, func) {
    if (elem.addEventListener) {
        elem.addEventListener(type, func, false);
    }
    else {
        elem.attachEvent('on' + type, func);
    }
}

'use strict';

var utils     = require('../utils');
var load      = require('../load/index');
var build     = require('../build/index');
var CharMaps  = require('../build/CharacterMaps');
var paint     = require('../paint/index');
var webColors = require('../paint/web-colors');
var solve     = require('../solve');
var view      = require('./view');
var mainView  = require('../view');

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
                    state.currentlyShowingText = !state.currentlyShowingText;
                    view.updateShowingTextCtrl(state, ctrls);

                    solve.reset(maze, state);
                    paint.all(maze, canvas, state);

                    view.enableCtrlById('maze-solve-start-ctrl');
                    view.disableCtrlById('maze-solve-pause-ctrl');
                    view.disableCtrlById('maze-solve-reset-ctrl');

                    evt.stopPropagation();
                    stopDefault(evt);
                },
                type: 'click'
            },

            // To ensure elements exist with these ids.
            'maze-show-text-label': {},
            'maze-hide-text-label': {},

            'maze-color-text-random': {
                action: function() {
                    colorText(maze, canvas, state, webColors.randomBrightWebColor());
                },
                type: 'click'
            },

            'maze-color-text-default': {
                init: function() {
                    // No need to have two ways to color the text black.
                    if (state.colors.textDefault === 'black') {
                       view.hideControlById('maze-color-text-default');
                    }
                },
                action: function() {
                    colorText(maze, canvas, state, state.colors.textDefault);
                },
                type: 'click'
            },

            'maze-color-text-black': {
                action: function() {
                    colorText(maze, canvas, state, 'black');
                },
                type: 'click'
            },

            'maze-fluctuate-text-color': {
                init: function() {
                    view.updateFluctuateTextColorCtrl(state);
                },
                action: function() {
                    state.colors.fluctuateTextColor = !state.colors.fluctuateTextColor;
                    view.updateFluctuateTextColorCtrl(state);
                    if (state.colors.fluctuateTextColor && !state.currentlyShowingText) {
                        view.toggleShowingText();
                    }
                    paint.all(maze, canvas, state);
                },
                type: 'click'
            },

            // To ensure elements exist with these ids.
            'maze-fluctuate-text-color-checked': {},
            'maze-fluctuate-text-color-unchecked': {},

            // Toggle showing/hiding maze solution.
            'maze-show-solution-ctrl': {
                init: function() {
                    view.updateShowingSolutionCtrl(state);
                },
                action: function(evt) {
                    state.currentlyShowingSolution = !state.currentlyShowingSolution;
                    view.updateShowingSolutionCtrl(state);

                    solve.reset(maze, state);
                    paint.all(maze, canvas, state);

                    view.enableCtrlById('maze-solve-start-ctrl');
                    view.disableCtrlById('maze-solve-pause-ctrl');
                    view.disableCtrlById('maze-solve-reset-ctrl');

                    evt.stopPropagation();
                    stopDefault(evt);
                },
                type: 'click'
            },

            // To ensure elements exist with these ids.
            'maze-show-solution-label': {},
            'maze-hide-solution-label': {},

            'maze-color-solution-random': {
                action: function() {
                    colorSolution(maze, canvas, state, webColors.randomBrightWebColor());
                },
                type: 'click'
            },

            'maze-color-solution-default': {
                init: function() {
                    // No need to have two ways to color the solution black.
                    if (state.colors.solutionDefault === 'black') {
                       view.hideControlById('maze-color-solution-default');
                    }
                },
                action: function() {
                    colorSolution(maze, canvas, state, state.colors.solutionDefault);
                },
                type: 'click'
            },

            'maze-color-solution-black': {
                action: function() {
                    colorSolution(maze, canvas, state, 'black');
                },
                type: 'click'
            },

            'maze-fluctuate-solution-color': {
                init: function() {
                    view.updateFluctuateSolutionColorCtrl(state);
                },
                action: function() {
                    state.colors.fluctuateSolutionColor = !state.colors.fluctuateSolutionColor;
                    view.updateFluctuateSolutionColorCtrl(state);
                    if (state.colors.fluctuateSolutionColor && !state.currentlyShowingSolution) {
                        view.toggleShowingSolution();
                    }
                    paint.all(maze, canvas, state);
                },
                type: 'click'
            },

            // To ensure elements exist with these ids.
            'maze-fluctuate-solution-color-checked': {},
            'maze-fluctuate-solution-color-unchecked': {},

            // Start solve animation.
            'maze-solve-start-ctrl': {
                action: function(evt) {
                    if (state.currentlyShowingText) {
                        view.toggleShowingText();
                    }
                    if (state.currentlyShowingSolution) {
                        view.toggleShowingSolution();
                    }

                    solve.start(maze, canvas, state, endOfMazeCtrlsUpdate);

                    view.disableCtrlById('maze-solve-start-ctrl');
                    view.enableCtrlById('maze-solve-pause-ctrl');
                    view.enableCtrlById('maze-solve-reset-ctrl');

                    stopDefault(evt);
                },
                type: 'click'
            },

            // Pause solve animation.
            'maze-solve-pause-ctrl': {
                init: function() {
                    view.disableCtrlById('maze-solve-pause-ctrl');
                },
                action: function(evt) {
                    solve.pause(state);

                    view.enableCtrlById('maze-solve-start-ctrl');
                    view.disableCtrlById('maze-solve-pause-ctrl');

                    stopDefault(evt);
                },
                type: 'click'
            },

            // Reset solve animation.
            'maze-solve-reset-ctrl': {
                init: function() {
                    view.disableCtrlById('maze-solve-reset-ctrl');
                },
                action: function(evt) {
                    solve.reset(maze, state);

                    view.enableCtrlById('maze-solve-start-ctrl');
                    view.disableCtrlById('maze-solve-pause-ctrl');
                    view.disableCtrlById('maze-solve-reset-ctrl');

                    paint.all(maze, canvas, state);

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
                    view.updateSpeedMeter(state, state.solve.speed, null);
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
                    view.disableCtrlById('maze-auto-size-ctrl');
                },
                action: function(evt) {
                    if (state.locationSize != state.autoFittedLocationSize) {
                        load.autoSetLocationSize(state);
                        maze = rebuild(maze, canvas, state);
                        view.updateSizeCtrls(state);
                    }

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
                        if (input.value !== state.originalText) {
                            view.enableCtrlById('maze-reset-ctrl');
                        }
                        else {
                            view.disableCtrlById('maze-reset-ctrl');
                        }

                        // Clean the text with CharMaps whitelist function.
                        var text = CharMaps.cleanText(input.value);

                        // Clear the previous timeout, if there was one, because more
                        // input has arrived.
                        clearTimeout(state.textChangeRebuildTimeout);

                        // Use timeouts so each keystroke doesn't start an expensive rebuild.
                        if (text) {
                            state.textChangeRebuildTimeout = setTimeout(function() {
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
                    view.disableCtrlById('maze-reset-ctrl');
                },
                action: function(evt) {
                    state.text = state.originalText;
                    load.autoSetLocationSize(state);
                    maze = rebuild(maze, canvas, state);

                    view.clearTextInput();
                    view.updateSizeCtrls(state);
                    view.disableCtrlById('maze-reset-ctrl');

                    stopDefault(evt);
                },
                type: 'click'
            }
        };

        var id, e, c;

        // Ensure control elements are present.
        for (id in ctrls) {
            if (!document.getElementById(id)) {
                throw new Error("No element found with id '" + id + "'");
            }
        }

        // Initialize control with init function.
        for (id in ctrls) {
            e = document.getElementById(id);
            if (e) {
                c = ctrls[id];
                if (c.hasOwnProperty('init')) {
                    c.init();
                }
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
            clearTimeout(state.screenChangeRebuildTimeout);

            state.screenChangeRebuildTimeout = setTimeout(function() {
                load.autoSetLocationSize(state);
                maze = rebuild(maze, canvas, state);
                view.updateSizeCtrls(state);
                mainView.setMazeTopMargin(state.mazeMargin);
            }, 300);

            stopDefault(evt);
        });

        view.configureBootstrapDropdowns(addListener);
    }
};

function colorText(maze, canvas, state, color) {
    if (!state.currentlyShowingText) {
        view.toggleShowingText();
    }
    state.colors.text = color;
    paint.all(maze, canvas, state);
}

function colorSolution(maze, canvas, state, color) {
    if (!state.currentlyShowingSolution) {
        view.toggleShowingSolution();
    }
    state.colors.solution = color;
    paint.all(maze, canvas, state);
}

function adjustSpeed(maze, canvas, state, ctrls, speed, prevSpeed) {
    var continueRunning = false;

    if (state.solve.running) {
        solve.pause(state);
        continueRunning = true;
    }

    if (speed >= 1 && speed <= state.solve.animationDelays.length) {
        state.solve.speed = speed;
        view.updateSpeedCtrls(state);
        view.updateSpeedMeter(state, speed, prevSpeed);
    }

    if (continueRunning) {
        solve.start(maze, canvas, state, endOfMazeCtrlsUpdate);
    }
}

// A callback for the solve module to use to update the solve controls
// when the animation reaches the end of the maze.
function endOfMazeCtrlsUpdate() {
    view.enableCtrlById('maze-solve-start-ctrl');
    view.disableCtrlById('maze-solve-pause-ctrl');
    view.disableCtrlById('maze-solve-reset-ctrl');
}

// Rebuild the maze from scratch.
function rebuild(maze, canvas, state) {
    solve.reset(maze, state);

    view.enableCtrlById('maze-solve-start-ctrl');
    view.disableCtrlById('maze-solve-pause-ctrl');
    view.disableCtrlById('maze-solve-reset-ctrl');

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

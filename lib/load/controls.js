'use strict';

var utils    = require('../utils');
var build    = require('../build/index');
var CharMaps = require('../build/CharacterMaps');
var paint    = require('../paint');
var solve    = require('../solve');

// Initialize controls and register listeners for control actions.
module.exports = function(maze, canvas, state, loadCanvasCB, setLocationSizeCB, autoSetLocationSizeCB) {
    var id, c;

    // An object with each control's element, init function, and, where
    // relevant, an action function and action type.
    var ctrls = {

        // Starts solving.
        'maze-solve-start-ctrl': {
            elem: document.getElementById('maze-solve-start-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Solve';
            },
            action: function(evt) {
                // Hide text if it's showing.
                if (state.currentlyShowingText) {
                    this['maze-show-text-ctrl'].elem.click();
                }
                solve.run(maze, canvas, state, false);
                stopDefault(evt);
            },
            type: 'click'
        },

        // Stops solving.
        'maze-solve-stop-ctrl': {
            elem: document.getElementById('maze-solve-stop-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Stop';
                this.elem.setAttribute('disabled', 'disabled');
            },
            action: function(evt) {
                solve.run(maze, canvas, state, false);
                stopDefault(evt);
            },
            type: 'click'
        },

        // Continues solving.
        'maze-solve-continue-ctrl': {
            elem: document.getElementById('maze-solve-continue-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Continue';
                this.elem.setAttribute('disabled', 'disabled');
            },
            action: function(evt) {
                solve.run(maze, canvas, state, false);
                stopDefault(evt);
            },
            type: 'click'
        },

        // Resets the solve state.
        'maze-solve-reset-ctrl': {
            elem: document.getElementById('maze-solve-reset-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Reset';
                this.elem.setAttribute('disabled', 'disabled');
            },
            action: function(evt) {
                solve.run(maze, canvas, state, true);
                stopDefault(evt);
            },
            type: 'click'
        },

        // Toggles showing and hiding the maze's solution.
        'maze-show-solution-ctrl': {
            elem: document.getElementById('maze-show-solution-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Show Solution';
            },
            action: function(evt) {
                // Hide text if it's showing.
                if (state.currentlyShowingText) {
                    this['maze-show-text-ctrl'].elem.click();
                }
                solve.show(maze, canvas, state);
                stopDefault(evt);
            },
            type: 'click'
        },

        // A label for the solve speed controls.
        'maze-speed-label': {
            elem: document.getElementById('maze-speed-label'),
            init: function() {
                this.elem.innerHTML = 'Speed';
            }
        },

        // Decreases the solve animation speed.
        'maze-decrease-speed-ctrl': {
            elem: document.getElementById('maze-decrease-speed-ctrl'),
            init: function() {
                this.elem.innerHTML = '-';
            },
            action: function(evt) {
                // Solve speeds are one more than the index of the current animation delay.
                var currSpd = 1 + state.solve.animationDelays.indexOf(state.solve.speed);

                if (currSpd > 1) {
                    updateSpeedCtrls(maze, canvas, state, ctrls, currSpd - 1);
                }
                stopDefault(evt);
            },
            type: 'click'
        },

        // Increases the solve animation speed.
        'maze-increase-speed-ctrl': {
            elem: document.getElementById('maze-increase-speed-ctrl'),
            init: function() {
                this.elem.innerHTML = '+';
            },
            action: function(evt) {
                // Solve speeds are one more than the index of the current animation delay.
                var currSpd = 1 + state.solve.animationDelays.indexOf(state.solve.speed);

                if (currSpd < state.solve.animationDelays.length) {
                    updateSpeedCtrls(maze, canvas, state, ctrls, currSpd + 1);
                }
                stopDefault(evt);
            },
            type: 'click'
        },

        // Toggles showing and hiding the maze's text.
        'maze-show-text-ctrl': {
            elem: document.getElementById('maze-show-text-ctrl'),
            init: function() {
                var text = state.currentlyShowingText ? 'Hide Text' : 'Show Text';
                this.elem.innerHTML = text;
            },
            action: function(evt) {
                state.currentlyShowingText = !state.currentlyShowingText;

                var text = state.currentlyShowingText ? 'Hide Text' : 'Show Text';
                this['maze-show-text-ctrl'].elem.innerHTML = text;

                solve.run(maze, canvas, state, true);
                paint.all(maze, canvas, state);

                stopDefault(evt);
            },
            type: 'click'
        },

        // A label for the size controls.
        'maze-size-label': {
            elem: document.getElementById('maze-size-label'),
            init: function() {
                this.elem.innerHTML = 'Size';
            }
        },

        // Rebuilds the maze with path sizes a pixel smaller in both x and y.
        'maze-decrease-size-ctrl': {
            elem: document.getElementById('maze-decrease-size-ctrl'),
            init: function() {
                this.elem.innerHTML = '-';
            },
            action: function(evt) {
                if (state.locationSize - 1 >= utils.minLocationSize) {
                    setLocationSizeCB(state, state.locationSize - 1);
                    maze = rebuild(maze, canvas, state, loadCanvasCB);

                    updateSizingControlsDisabledState(this, state);
                }
                stopDefault(evt);
            },
            type: 'click'
        },

        // Rebuilds the maze with path sizes a pixel larger in both x and y.
        'maze-increase-size-ctrl': {
            elem: document.getElementById('maze-increase-size-ctrl'),
            init: function() {
                this.elem.innerHTML = '+';
            },
            action: function(evt) {
                if (!overMaxLocationSize(state.locationSize + 1, state)) {
                    setLocationSizeCB(state, state.locationSize + 1);
                    maze = rebuild(maze, canvas, state, loadCanvasCB);

                    updateSizingControlsDisabledState(this, state);
                }
                stopDefault(evt);
            },
            type: 'click'
        },

        // Fits the maze to screen.
        'maze-auto-size-ctrl': {
            elem: document.getElementById('maze-auto-size-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Fit';
                this.elem.setAttribute('disabled', 'disabled');
            },
            action: function(evt) {
                autoSetLocationSizeCB(state);
                maze = rebuild(maze, canvas, state, loadCanvasCB);

                updateSizingControlsDisabledState(this, state);

                stopDefault(evt);
            },
            type: 'click'
        },

        // Generates a new maze with the current text.
        'maze-rebuild-ctrl': {
            elem: document.getElementById('maze-rebuild-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Regenerate';
            },
            action: function(evt) {
                maze = rebuild(maze, canvas, state, loadCanvasCB);
                stopDefault(evt);
            },
            type: 'click'
        },

        // Builds a new maze with text from the input field.
        'maze-text-input-ctrl': {
            elem: document.getElementById('maze-text-input-ctrl'),
            init: function() {
                this.elem.placeholder = 'Type To Customize';
            },
            action: function() {
                var input = this['maze-text-input-ctrl'].elem;
                var reset = this['maze-reset-ctrl'].elem;

                input.oninput = function() {
                    // Clean the text with CharMaps whitelist function.
                    var text = CharMaps.cleanText(input.value);

                    // Clear the previous timeout, if there was one, because more 
                    // input has arrived.
                    clearTimeout(state.changeTextRebuildTimeout);

                    // Use a timeout so each keystroke doesn't start an expensive
                    // maze rebuild.
                    if (text) {
                        state.changeTextRebuildTimeout = setTimeout(function() {
                            state.text = input.value;
                            autoSetLocationSizeCB(state);
                            maze = rebuild(maze, canvas, state, loadCanvasCB);
                            updateSizingControlsDisabledState(ctrls, state);

                            // Show the reset button when text is changed.
                            if (reset && text !== state.originalText) {
                                reset.removeAttribute('disabled');
                            }
                        }, 300);
                    }
                };

                input.onpropertychange = input.oninput;
            }
        },

        // Resets the maze text to the original text.
        'maze-reset-ctrl': {
            elem: document.getElementById('maze-reset-ctrl'),
            init: function() {
                this.elem.innerHTML = 'Reset Text';
                this.elem.setAttribute('disabled', 'disabled');
            },
            action: function(evt) {
                // Clear the custom maze text input box.
                this['maze-text-input-ctrl'].elem.value = '';

                state.text = state.originalText;
                autoSetLocationSizeCB(state);
                maze = rebuild(maze, canvas, state, loadCanvasCB);

                updateSizingControlsDisabledState(ctrls, state);

                this['maze-reset-ctrl'].elem.setAttribute('disabled', 'disabled');

                stopDefault(evt);
            },
            type: 'click'
        }
    };

    // Inject initial names/text into controls.
    for (id in ctrls) {
        c = ctrls[id];

        if (c.elem) {
            c.init();
        }
        else {
            throw new Error("No element found with id '" + id + "'");
        }
    }

    // Register listeners for controls.
    for (id in ctrls) {
        c = ctrls[id];

        if ('action' in c && 'type' in c) {
            addListener(c.type, c.elem, c.action.bind(ctrls));
        }
        else if ('action' in c) {
            c.action.bind(ctrls)();
        }
    }

    // Add window resize listener to rebuild when window size changes.
    addListener('resize', window, function(evt) {
        clearTimeout(state.changeWindowSizeRebuildTimeout);

        state.changeWindowSizeRebuildTimeout = setTimeout(function() {
            autoSetLocationSizeCB(state);
            maze = rebuild(maze, canvas, state, loadCanvasCB);
            updateSizingControlsDisabledState(ctrls, state);
        }, 300);

        stopDefault(evt);
    });
};

// Use IE event listeners instead, when required.
function addListener(type, elem, func) {
    if (elem.addEventListener) {
        elem.addEventListener(type, func, false);
    }
    else {
        elem.attachEvent('on' + type, func);
    }
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

// Rebuild the maze from scratch.
function rebuild(maze, canvas, state, loadCanvasCB) {
    // First reset the solve module's state.
    solve.run(maze, canvas, state, true);

    maze = build(state);
    loadCanvasCB(maze, state);
    paint.all(maze, canvas, state);

    return maze;
}

function updateSpeedCtrls(maze, canvas, state, ctrls, speed) {
    var continueRunning = false;

    // Stop solving if solving.
    if (state.solve.running) {
        solve.run(maze, canvas, state);
        continueRunning = true;
    }

    // Update disabled state of speed controls.
    switch (speed) {
        case 1:
            ctrls['maze-decrease-speed-ctrl'].elem.setAttribute('disabled', 'disabled');
            ctrls['maze-increase-speed-ctrl'].elem.removeAttribute('disabled');
            break;
        case state.solve.animationDelays.length:
            ctrls['maze-decrease-speed-ctrl'].elem.removeAttribute('disabled');
            ctrls['maze-increase-speed-ctrl'].elem.setAttribute('disabled', 'disabled');
            break;
        default: 
            ctrls['maze-decrease-speed-ctrl'].elem.removeAttribute('disabled');
            ctrls['maze-increase-speed-ctrl'].elem.removeAttribute('disabled');
    }

    // Update the solve speed.
    state.solve.speed = state.solve.animationDelays[speed - 1];

    // Continue solving if soving was stopped.
    if (continueRunning) {
        solve.run(maze, canvas, state);
    }
}

function overMaxLocationSize(locationSize, state) {
    return locationSize > state.autoFittedLocationSize + 10;
}

// Updates the disabled state of increase/decrease size and auto fit controls.
function updateSizingControlsDisabledState(ctrls, state) {
    if (state.locationSize === state.autoFittedLocationSize) {
        ctrls['maze-auto-size-ctrl'].elem.setAttribute('disabled', 'disabled');
    }
    else {
        ctrls['maze-auto-size-ctrl'].elem.removeAttribute('disabled');
    }

    if (state.locationSize === utils.minLocationSize) {
        ctrls['maze-decrease-size-ctrl'].elem.setAttribute('disabled', 'disabled');
    }
    else {
        ctrls['maze-decrease-size-ctrl'].elem.removeAttribute('disabled');
    }

    // TODO The following is a hack to prevent building mazes that aren't completely
    // connected. To fix the problem, make sure all attempts to vertically connect
    // characters succeed.

    if (overMaxLocationSize(state.locationSize + 5, state)) {
        ctrls['maze-increase-size-ctrl'].elem.setAttribute('disabled', 'disabled');
    }
    else {
        ctrls['maze-increase-size-ctrl'].elem.removeAttribute('disabled');
    }
}

<p style="text-align: center">
    <img width="900" src="https://raw.githubusercontent.com/jesse-blake/text-maze/master/extra/readme.gif">
</p>

# Text Maze

An [npm](https://www.npmjs.com/package/text-maze) package to generate a maze that has paths forming the characters in a string of text, a single solution, and controls to do stuff, including:

* Regenerate the paths of the maze using the current text.
* Show and hide the text and/or the solution.
* Animate searching for the solution at various speeds.
* Pause, continue and stop the animation.
* Increase and decrease the size of the paths in the maze.
* Customize the maze's text.
* Restore the original text.

The maze is responsive to screen size changes, too.

## Example

Just clone this repo and point your browser to `text-maze/example/dist/index.html`! Or go to [www.littlesystem.com](http://www.littlesystem.com).

## Usage

Here are instructions to get up and running without frills. See `text-maze/example/dist` for the frills version, which uses [Bootstrap](https://github.com/twbs/bootstrap).

1. Install:
```sh
npm install --save text-maze
```
2. Create `text-maze/index.js`:
```js
var textmaze = require('text-maze');
textmaze.init();
```
3. Bundle with [Browserify](https://github.com/substack/node-browserify):
```sh
npm install -g browserify
browserify index.js -o text-maze.js
```
4. Create `text-maze/index.html` containing:
```html
<div id="maze-menu">

    <!-- Maze rebuild control -->
    <button id="maze-rebuild-ctrl" type="button" >Refresh Paths</button>

    <!-- Maze text controls -->
    <button id="maze-show-text-ctrl" type="button" >
        <span id="maze-show-text-label">Show Text</span>
        <span id="maze-hide-text-label">Hide Text</span>
    </button>
    <button id="maze-color-text-random">Random Color</button>
    <button id="maze-color-text-default">Default Color</button>
    <button id="maze-color-text-black">Black</button>
    <button id="maze-fluctuate-text-color">
        <span id="maze-fluctuate-text-color-checked">Don't Fluctuate Color</span>
        <span id="maze-fluctuate-text-color-unchecked">Fluctuate Color</span>
    </button>

    <!-- Maze solution controls -->
    <button id="maze-show-solution-ctrl"  type="button" >
        <span id="maze-show-solution-label">Show Solution</span>
        <span id="maze-hide-solution-label">Hide Solution</span>
    </button>
    <button id="maze-color-solution-random">Random Color</button>
    <button id="maze-color-solution-default">Default Color</button>
    <button id="maze-color-solution-black">Black</button>
    <button id="maze-fluctuate-solution-color">
        <span id="maze-fluctuate-solution-color-checked">Don't Fluctuate Color</span>
        <span id="maze-fluctuate-solution-color-unchecked">Fluctuate Color</span>
    </button>

    <!-- Maze solution animation controls -->
    <button id="maze-solve-start-ctrl" type="button">Solve</button>
    <button id="maze-solve-pause-ctrl" type="button">Pause</button>
    <button id="maze-solve-reset-ctrl" type="button">Reset</button>
    <button id="maze-decrease-speed-ctrl" type="button">-</button>
    Speed
    <button id="maze-increase-speed-ctrl" type="button">+</button>

    <!-- Maze size controls -->
    <button id="maze-decrease-size-ctrl" type="button">-</button>
    Size
    <button id="maze-increase-size-ctrl" type="button">+</button>
    <button id="maze-auto-size-ctrl" type="button">Fit</button>

    <!-- Change maze text controls -->
    <input id="maze-text-input-ctrl" type="text" placeholder="Change the text...">
    <button id="maze-reset-ctrl" type="button">Reset</button>
</div>

<canvas id="text-maze">Your browser does not support the canvas tag!</canvas>
<script src="js/text-maze.js"></script>
```
Note: the above `id`s are required, but the element types and their inner text can likely be changed.

## Options

Define any or all of these in an object given to the Text Maze `init` function. Defaults are shown.

```js
textmaze.init({

    // The default text to be rendered in the maze.
    text: "The riddles of God are more satisfying than the solutions of man. G.K.C.",

    // Show the text and/or solution on load.
    currentlyShowingText: true,
    currentlyShowingSolution: true,

    // Show the speed meter; use with Bootstrap. (See text-maze/example/dist/index.html.)
    useSpeedMeter: false,

    // Set the default color for the text and/or solution; must be a web color.
    textColor: 'black',
    solutionColor: 'chartreuse',

    // Randomize text and/or solution color.
    randomizeTextColor: false,
    randomizeSolutionColor: false,

    // Fluctuate the text and/or solution color just a little.
    fluctuateTextColor: false,
    fluctuateSolutionColor: false
});
```

## Development

The example directory contains a development environment to lint, minify, and Browserify JS, to minify CSS, etc. To get it going:

1. Run `git clone https://github.com/jesse-blake/text-maze.git`
2. In `text-maze` run `npm link`
4. In `text-maze/example` run `npm link text-maze`
3. In `text-maze/example` run `npm install`
5. In `text-maze/example` run `gulp`

Gulp will watch for changes in `text-maze/lib` and `text-maze/example/src`, and build to `text-maze/example/dist`. Load `text-maze/example/dist/index.html` in your browser to see your changes.

## Thanks

Thanks to Herman Tulleken and his [Algorithms for Making More Interesting Mazes](http://www.gamasutra.com/blogs/HermanTulleken/20161005/282629/Algorithms_for_making_more_interesting_mazes.php) blog post.

And to Patrick Wheeler on the [Programming Throwdown](http://www.programmingthrowdown.com/) podcast for mentioning the above blog post in [Episode 59: Deploying Software](http://www.programmingthrowdown.com/2016/10/episode-59-deploying-software.html).

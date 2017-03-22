<p style="text-align: center">
    <img width="900" src="https://raw.githubusercontent.com/jesse-blake/text-maze/master/extra/readme.gif">
</p>

# Text Maze

An [npm](https://www.npmjs.com/package/text-maze) package to generate a maze that has a single solution, paths forming the characters in a string of text, and controls to do stuff, like: 

* Regenerate the paths of the maze using the current text.
* Show and hide the text.
* Show and hide the solution.
* Animate searching for the solution at various speeds.
* Pause, continue and stop the animation.
* Increase and decrease the size of the paths in the maze.
* Customize the maze's text.
* Restore the original text.

The maze is responsive to screen size changes too.

## Example

Just clone this repo and point your browser to `text-maze/example/dist/index.js`! Or go to [www.littlesystem.com](http://www.littlesystem.com).

## Usage

Here are the no-frills up-and-running instructions. See `text-maze/example/dist` for frills, which uses [Bootstrap](https://github.com/twbs/bootstrap).

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
    <button id="maze-rebuild-ctrl" type="button" >Refresh Paths</button>
    <button id="maze-show-text-ctrl" type="button" >
        <span id="maze-show-text-label">Show Text</span>
        <span id="maze-hide-text-label">Hide Text</span>
    </button>
    <button id="maze-show-solution-ctrl"  type="button" >
        <span id="maze-show-solution-label">Show Solution</span>
        <span id="maze-hide-solution-label">Hide Solution</span>
    </button>
    <button id="maze-solve-start-ctrl" type="button">Solve</button>
    <button id="maze-solve-pause-ctrl" type="button">Pause</button>
    <button id="maze-solve-reset-ctrl" type="button">Reset</button>
    <button id="maze-decrease-speed-ctrl" type="button">-</button>
    Speed
    <button id="maze-increase-speed-ctrl" type="button">+</button>
    Size
    <button id="maze-decrease-size-ctrl" type="button">-</button>
    <button id="maze-increase-size-ctrl" type="button">+</button>
    <button id="maze-auto-size-ctrl" type="button">Fit</button>
    <input id="maze-text-input-ctrl" type="text" placeholder="Change the text...">
    <button id="maze-reset-ctrl" type="button">Reset</button>
</div>
<canvas id="text-maze">Your browser does not support the canvas tag!</canvas>
<script src="js/text-maze.js"></script>
```
Note: the above `id`s are required, but the element types and their inner text can change.

## Options

Define any or all of these in an object given to the Text Maze `init` function. Defaults are shown.

```js
textmaze.init({

    // The text to be rendered in the maze.
    text: "Hope means hoping when things are hopeless, or it is no virtue at all. G.K.C.",
    
    // Show the text in the maze on load.
    currentlyShowingText: false,
    
    // Show the speed meter. Use with Bootstrap. (See text-maze/example/dist/index.html.)
    useSpeedMeter: false,
    
    colors: {
        // The color of the text; must be a web color.
        text: 'black',
        
        // The color of the solution path; must be a web color.
        solution: 'black',
        
        // Randomize text/solution color.
        randomize: false,
        
        // Fluctuate the text/solution color a little.
        fuctuate: false
    }
});
```

## Development

The example directory contains a development environment. To get it going:

1. Run `git clone https://github.com/jesse-blake/text-maze.git`
2. In `text-maze` run `npm link`
4. In `text-maze/example` run `npm link text-maze`
3. In `text-maze/example` run `npm install`
5. In `text-maze/example` run `gulp`

Gulp will watch for changes in `text-maze/lib` and `text-maze/example/src`, and build to `text-maze/example/dist`. Load `text-maze/example/dist/index.html` in your browser to see your changes.

## Thanks

Thanks to Herman Tulleken and his [Algorithms for Making More Interesting Mazes](http://www.gamasutra.com/blogs/HermanTulleken/20161005/282629/Algorithms_for_making_more_interesting_mazes.php) blog post.

And to Patrick Wheeler on the [Programming Throwdown](http://www.programmingthrowdown.com/) podcast for mentioning the above blog post in [Episode 59: Deploying Software](http://www.programmingthrowdown.com/2016/10/episode-59-deploying-software.html).

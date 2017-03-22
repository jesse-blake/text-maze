<p style="text-align: center">
    <img width="900" src="https://raw.githubusercontent.com/jesse-blake/text-maze/master/extra/readme.gif">
</p>

# Text Maze

An [npm](https://www.npmjs.com) package to generate a maze with a single solution, with paths in the form of text.

The controls will solve the maze with or without animation, animate at different speeds, show and hide the text, rebuild the maze, and change the maze's text. It will resize automatically when the screen size changes too.

## Example

Just clone this repo and point your browser to `text-maze/example/dist/index.js`! Or go to [www.littlesystem.com](http://www.littlesystem.com).

## Usage

The following is a no-frills start-up. See `text-maze/example/dist` for the frills version. It uses [Bootstrap](https://github.com/twbs/bootstrap).

1. Install:
```
npm install --save text-maze
```
2. Create `text-maze/index.js`:
```
var textmaze = require('text-maze');
textmaze.init();
```
3. Bundle with [Browserify](https://github.com/substack/node-browserify):
```
npm install -g browserify
browserify index.js -o text-maze.js
```
4. Create: `text-maze/index.html` containing:
```
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
```
Note: the above `id`s are required, but the element types and their inner text can change.

## Options

Define any or all of these in an object given to the Text Maze `init` function.

```
textmaze.init({

    // The text to be rendered in the maze. A string.
    text: <a string of text>,
    
    // Paint the text in the maze on load. Default: false
    currentlyShowingText: <boolean>,
    
    // Show the speed meter. Use with Bootstrap (See text-maze/example/dist/index.html) Default: false
    useSpeedMeter: <boolean>,
    
    colors: {
        // The color of text. Default: black
        text: <a web color>,
        
        // The color of the solution path. Default: black
        solution: <a web color>,    
        
        // Randomize text and solution color. Default: false
        randomize: <boolean>,
        
        // Fluctuate the text/solution color a little. Default: false
        fuctuate: <boolean>
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

And to Patrick Wheeler on the [Programming Throwdown](http://www.programmingthrowdown.com/) podcast for mentioning that post in [Episode 59: Deploying Software](http://www.programmingthrowdown.com/2016/10/episode-59-deploying-software.html).

And to [G.K. Chesterton](http://www.chesterton.org/quotations-of-g-k-chesterton/) for the quote used in the README image above.

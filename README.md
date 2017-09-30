# Text Maze

Create mazes with paths in the form of lines of text.

Use [text-maze-render](https://github.com/jesse-blake/text-maze-render) to render a text maze in a browser via the HTML Canvas API.

## Description

Each maze is a 2D array. The value at each index in the nested arrays is a number indicating the type of location in the maze. The solution path follows negative values through the maze.

* `2` A path and part of the embedded text.
* `1` A path but not part of the embedded text.
* `0` Not a path.
* `-1` As 1, but also on the solution path.
* `-2` As 2, but also on the solution path.

## Install

```sh
npm install --save text-maze
```

## Options

* `width` Optional maze width. An array length. The maze is auto-sized for the browser when width is not given.
* `margin` Optional margin in pixels. Used when auto-sizing, ignored when width is given. The following default margin values are used for auto-sizing when margin is not given: 30px for screens < 576px, 100px otherwise.

## Usage

Import text-maze.
```js
var tm = require('text-maze');
```

Create an auto-sized maze.
```js
var maze = tm.init('the text you want embedded in the maze').maze;
```

Get the auto-size values for use with the [text-maze-render](https://github.com/jesse-blake/text-maze-render) package.
```js
var result    = tm.init('Scooby Dooby Doo');

var maze      = result.maze;      // The maze.
var endpoints = result.endpoints; // Know your endpoint coordinates.
var cellSize  = result.cellSize;  // Render each maze location in a cellSize × cellSize square.
```

Create a maze of `width` 100. The cellSize property in the returned object will be `null`.
```js
var maze = tm.init('Where are you?', { width: 100 }).maze;
```

Create a maze auto-sized for the screen leaving 200 pixels of `margin`.
```js
var maze = tm.init("We've got some work to do now.", { margin: 200 }).maze;
```

For use in a browser, bundle your code with something like [browserify](https://github.com/browserify/browserify).
```sh
browserify code.js -o bundle.js
```

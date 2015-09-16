# metalsmith-matters

A Metalsmith plugin to read metadata from YAML frontmatter

"But wait!" you say, "doesn't Metalsmith already have that built-in"? Well, yes. For now anyway. This plugin is an attempt to extract that functionality out of the core

## Installation

  npm install --save metalsmith-matters

## CLI Usage

After installing metalsmith-matters, simply add the `metalsmith-matters` key to the plugins in your `metalsmith.json` file. Be sure to include it *before* any plugins which need to use the metadata in your frontmatter, or which expect as input files with no frontmatter header. Generally speaking, this means that metalsmith-matters should be the first plugin in the list.

```javascript
{
  "plugins": {
    "metalsmith-matters": true
    // Other plugins...
  }
}
```

## JavaScript Usage

After installing metalsmith-matters, you can require `metalsmith-matters` in your code, then call the exported value to initialize the plugin and pass the result to `Metalsmith.use` (just as you would with any other Metalsmith plugin). Again, be sure to use metalsmith-matters *before* any plugins which need to use the metadata defined your frontmatter, or which expect as input files with no frontmatter header. Generally speaking, this means that metalsmith-matters should be the first plugin in the list.

```javascript
var frontmatter = require('metalsmith-matters');

Metalsmith(__dirname)
  .use(frontmatter())
  .use(/* Other plugins... */)
  .build(function(err) {
    if (err) throw err;
  });
```

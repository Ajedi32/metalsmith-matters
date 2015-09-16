# metalsmith-frontmatter

A Metalsmith plugin to read metadata from YAML frontmatter

"But wait!" you say, "doesn't Metalsmith already have that built-in"? Well, yes. For now anyway. This plugin is an attempt to extract that functionality out of the core

## Installation

  npm install --save metalsmith-frontmatter

## CLI Usage

After installing metalsmith-frontmatter, simply add the `metalsmith-frontmatter` key to the plugins in your `metalsmith.json` file. Be sure to include it *before* any plugins which need to use the metadata in your frontmatter, or which expect as input files with no frontmatter header. Generally speaking, this means that metalsmith-frontmatter should be the first plugin in the list.

```javascript
{
  "plugins": {
    "metalsmith-frontmatter": true
    // Other plugins...
  }
}
```

## JavaScript Usage

After installing metalsmith-frontmatter, you can require `metalsmith-frontmatter` in your code, then call the exported value to initialize the plugin and pass the result to `Metalsmith.use` (just as you would with any other Metalsmith plugin). Again, be sure to use metalsmith-frontmatter *before* any plugins which need to use the metadata defined your frontmatter, or which expect as input files with no frontmatter header. Generally speaking, this means that metalsmith-frontmatter should be the first plugin in the list.

```javascript
var frontmatter = require('metalsmith-frontmatter');

Metalsmith(__dirname)
  .use(frontmatter())
  .use(/* Other plugins... */)
  .build(function(err) {
    if (err) throw err;
  });
```

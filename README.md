# metalsmith-matters [![Build Status](https://travis-ci.org/Ajedi32/metalsmith-matters.svg)](https://travis-ci.org/Ajedi32/metalsmith-matters)

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin to read file
metadata from frontmatter. Supports all frontmatter formats supported by the
[gray-matter](https://github.com/jonschlinkert/gray-matter#optionslang)
library. (Including YAML, JSON, and TOML.)

"But wait!" you say. "Doesn't Metalsmith already have that built-in"? Well, yes.
For now anyway. This plugin is an attempt to extract that functionality out of
the Metalsmith core. Eventually the goal is to have frontmatter parsing removed
from the Metalsmith core entirely in favor of this plugin or a similar one (see
segmentio/metalsmith#157).

Even in the absence of that change though, this plugin has one key advantage
over the built-in frontmatter parsing in Metalsmith: it's composable with other
plugins. For example, you could use it with
[`metalsmith-branch`](https://github.com/ericgj/metalsmith-branch) to turn on
frontmatter parsing for only a subset of files, or you could place it *after*
[`metalsmith-s3`](https://github.com/mwishek/metalsmith-s3) in the plugin list
so that it parses frontmatter in downloaded files. Those are things you can't do
with Metalsmith's built-in frontmatter parsing.

## Installation

    npm install --save metalsmith-matters

## CLI Usage

After installing metalsmith-matters, simply add the `metalsmith-matters` key to
the plugins in your `metalsmith.json` file. Be sure to include it *before* any
plugins which need to use the metadata in your frontmatter, or which expect as
input files with no frontmatter header. Generally speaking, this means that
metalsmith-matters should be the first plugin in the list.

```javascript
{
  "plugins": {
    "metalsmith-matters": true
    // Other plugins...
  }
}
```

## JavaScript Usage

After installing metalsmith-matters, you can require `metalsmith-matters` in
your code, then call the exported value to initialize the plugin and pass the
result to `Metalsmith.use` (just as you would with any other Metalsmith plugin).
Again, be sure to use metalsmith-matters *before* any plugins which need to use
the metadata defined your frontmatter, or which expect as input files with no
frontmatter header. Generally speaking, this means that metalsmith-matters
should be the first plugin in the list.

```javascript
var frontmatter = require('metalsmith-matters');

Metalsmith(__dirname)
  .use(frontmatter())
  .use(/* Other plugins... */)
  .build(function(err) {
    if (err) throw err;
  });
```

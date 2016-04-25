# metalsmith-matters [![Build Status](https://travis-ci.org/Ajedi32/metalsmith-matters.svg)](https://travis-ci.org/Ajedi32/metalsmith-matters)

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin to read file
metadata from frontmatter. Supports all frontmatter formats supported by the
[gray-matter](https://github.com/jonschlinkert/gray-matter#optionslang)
library (including YAML, JSON, TOML, CSON, and more).

"But wait!" you say. "Doesn't Metalsmith already have frontmatter parsing
built-in"? Well, yes. For now anyway. This plugin is an attempt to extract that
functionality out of the Metalsmith core. Eventually the goal is to have
frontmatter parsing removed from the Metalsmith core entirely in favor of this
plugin or a similar one (see
[segmentio/metalsmith#157](https://github.com/segmentio/metalsmith/issues/157)).

Even in the absence of that change though, this plugin has several key
advantages over the built-in frontmatter parsing in Metalsmith. Firstly, it's
composable with other plugins. For example, you could use it with
[`metalsmith-branch`](https://github.com/ericgj/metalsmith-branch) to turn on
frontmatter parsing for only a subset of files, or you could place it *after*
[`metalsmith-s3`](https://github.com/mwishek/metalsmith-s3) in the plugin list
so that it parses frontmatter in downloaded files.

Secondly, this plugin provides a way to pass options to the underlying
frontmatter parsing library,
[gray-matter](https://github.com/jonschlinkert/gray-matter). This allows you to
do things like [change the delimiter used to separate frontmatter from the rest
of the file](https://github.com/jonschlinkert/gray-matter#optionsdelims), or
[set TOML as the default frontmatter
format](https://github.com/jonschlinkert/gray-matter#optionslang).

Thirdly, this plugin provides an additional feature allowing parsed frontmatter
to be automatically namespaced  under a single key (e.g. `page.keys` instead of
`keys`).

These are all things you can't do with Metalsmith's built-in frontmatter
parsing.


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
  "frontmatter": false, // Disable built-in frontmatter parsing (recommended)
  "plugins": {
    "metalsmith-matters": {
      // Options
    }
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
  .frontmatter(false) // Disable built-in frontmatter parsing (recommended)
  .use(frontmatter({
    // Options
  }))
  .use(/* Other plugins... */)
  .build(function(err) {
    if (err) throw err;
  });
```

## Options

### `namespace`

Type: `string`  
Default: `undefined`

Namespace all parsed data under a single key.

#### Example

Your frontmatter:
```` markdown
---
title: My title
author: Joe Writer
---
````

In the JavaScript:
```` javascript
  // new Metalsmith…
  .use(frontmatter({ namespace: 'page' }))
  // …build()
````

Now in your HTML, you can access the metadata like this (example with
Handlebars):

```` html
  <h1>{{ page.title }}</h1>
  <p>Author: {{ page.author }}</p>
````

### gray-matter Options

metalsmith-matters also supports all the options supported by
[`gray-matter`](https://github.com/jonschlinkert/gray-matter),
metalsmith-matters' underlying frontmatter parsing library (it's the same one
used by the Metalsmith core). These include:

* `parser`
* `eval`
* `lang`
* `delims`

For details on how to use these options, see the
[documentation for `gray-matter`](https://github.com/jonschlinkert/gray-matter#options).

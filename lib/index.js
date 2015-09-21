var matter = require('gray-matter');
var utf8 = require('is-utf8');
var each = require('metalsmith-each');

module.exports = frontmatter;

/**
 * Assign all iterable properties in `source` to `target`.
 *
 * In ECMAScript 6, this function can be replaced with `Object.assign`.
 *
 * @param {Object} target
 * @param {Object} source
 */

function mergeProperties(target, source){
  for (var propertyName in source) {
    target[propertyName] = source[propertyName];
  }
}

/**
 * Assign metadata in `file` based on the YAML frontmatter in `file.contents`.
 *
 * @param {Object} file The Metalsmith file object to extract frontmatter from
 * @param {string} filePath The path to the file represented by `file`
 */

function extractFrontmatter(file, filePath, options){
  if (utf8(file.contents)) {
    var parsed;

    try {
      parsed = matter(file.contents.toString(), options);
    } catch (e) {
      var errMsg = 'Invalid frontmatter in file';
      if (filePath !== undefined) errMsg += ": " + filePath;
      var err = new Error(errMsg);
      err.code = 'invalid_frontmatter';
      err.cause = e;
      throw err;
    }

    mergeProperties(file, parsed.data);
    file.contents = new Buffer(parsed.content);
  }
}

/**
 * Metalsmith plugin to extract metadata from frontmatter in file contents.
 *
 * @param {Object} options - Options to pass on to `gray-matter`
 * @return {Function}
 */

function frontmatter(options){
  return each(function(file, filePath){
    extractFrontmatter(file, filePath, options);
  });
}

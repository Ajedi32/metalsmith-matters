var matter = require('gray-matter');
var utf8 = require('is-utf8');
var each = require('metalsmith-each');

module.exports = frontmatter;

// Not needed in Node 4.0+
if (!Object.assign) Object.assign = require('object-assign');

/**
 * Assign metadata in `file` based on the YAML frontmatter in `file.contents`.
 *
 * @param {Object} file The Metalsmith file object to extract frontmatter from
 * @param {string} filePath The path to the file represented by `file`
 * @param {Object} options Options for the extraction routine
 * @param {Object} grayMatterOptions Options for gray-matter
 */

function extractFrontmatter(file, filePath, options, grayMatterOptions){
  if (utf8(file.contents)) {
    var parsed;

    try {
      parsed = matter(file.contents.toString(), grayMatterOptions);
    } catch (e) {
      var errMsg = 'Invalid frontmatter in file';
      if (filePath !== undefined) errMsg += ": " + filePath;
      var err = new Error(errMsg);
      err.code = 'invalid_frontmatter';
      err.cause = e;
      throw err;
    }

    if (options.hasOwnProperty('namespace')){
      var nsData = {}; nsData[options.namespace] = parsed.data;
      Object.assign(file, nsData);
    } else {
      Object.assign(file, parsed.data);
    }
    file.contents = new Buffer(parsed.content);
  }
}

/**
 * Metalsmith plugin to extract metadata from frontmatter in file contents.
 *
 * @param {Object} options - `Namespace` is used, the rest is passed on to `gray-matter`
 * @return {Function}
 */
function frontmatter(opts){
  var options = {}, grayMatterOptions = {};
  Object.keys(opts || {}).forEach(function(key){
    if (key === 'namespace'){
      options[key] = opts[key];
    } else {
      grayMatterOptions[key] = opts[key];
    }
  });

  return each(function(file, filePath){
    extractFrontmatter(file, filePath, options, grayMatterOptions);
  });
}

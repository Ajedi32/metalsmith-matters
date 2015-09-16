var assert = require('assert');
var Metalsmith = require('metalsmith');
var frontmatter = require('../lib');

describe('metalsmith-matters', function(){
  it('should add add metadata based on the frontmatter in the file', function(done){
    Metalsmith('test/fixtures/basic')
      .frontmatter(false)
      .use(frontmatter())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal(files["test.md"].someKey, "value");
        done();
      });
  });

  it('should remove frontmatter from the file contents', function(done){
    Metalsmith('test/fixtures/basic')
      .use(frontmatter())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal(files["test.md"].contents.toString(), "# Header\n\nContent\n");
        done();
      });
  });
});

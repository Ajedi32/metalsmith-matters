var assert = require('assert');
var Metalsmith = require('metalsmith');
var frontmatter = require('../lib');

describe('metalsmith-matters', function(){
  it('should add metadata based on the frontmatter in the file', function(done){
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
      .frontmatter(false)
      .use(frontmatter())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal(files["test.md"].contents.toString(), "# Header\n\nContent\n");
        done();
      });
  });

  describe('options', function(){
    describe('implemented', function(){
      it('should group metadata under one key', function(done){
        Metalsmith('test/fixtures/group-option')
          .frontmatter(false)
          .use(frontmatter({ group: 'groupByKey' }))
          .build(function(err, files){
            if (err) return done(err);
            assert.equal(files["test.md"].groupByKey.someKey, "value");
            done();
          });
      });
    });

    // Given that all metalsmith-matters options are currently implemented by
    // simply passing the options argument to gray-matter, I believe testing
    // only one of gray-matter's options is sufficient coverage of this feature.
    // If the implementation changes in the future, more comprehensive test
    // coverage may be necessary.

    describe('delims', function(){
      it('should set the delimiters used for frontmatter', function(done) {
        Metalsmith('test/fixtures/delimiters-option')
          .frontmatter(false)
          .use(frontmatter({delims: ['~~~', '~~~']}))
          .build(function(err, files){
            if (err) return done(err);
            assert.equal(files["test.md"].someKey, "value");
            done();
          });
      });
    });
  });
});

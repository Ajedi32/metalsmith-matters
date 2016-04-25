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
    describe('namespace', function(){
      it('should namespace metadata', function(done){
        Metalsmith('test/fixtures/namespace-option')
          .frontmatter(false)
          .use(frontmatter({ namespace: 'myNamespace' }))
          .build(function(err, files){
            if (err) return done(err);
            assert.equal(files["test.md"].myNamespace.someKey, "value");
            assert.equal(files["test.md"].someKey, undefined);
            done();
          });
      });
    });

    // gray-matter options
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
    describe('parser', function(){
      it('should set the parser used for frontmatter', function(done) {
        Metalsmith('test/fixtures/parser-option')
          .frontmatter(false)
          /* jshint evil:true */
          .use(frontmatter({parser: function(str) { return eval(str); }}))
          .build(function(err, files){
            if (err) return done(err);
            assert.equal(files["test.md"].someKey, "value");
            done();
          });
      });
    });
    describe('eval', function(){
      describe('when true', function(){
        it('should allow parsing executable frontmatter', function(done) {
          Metalsmith('test/fixtures/eval-option')
            .frontmatter(false)
            .use(frontmatter({eval: true}))
            .build(function(err, files){
              if (err) return done(err);
              assert.equal(files["test.md"].someKey, "value");
              done();
            });
        });
      });
      describe('when false', function(){
        it('should not allow parsing executable frontmatter', function(done) {
          Metalsmith('test/fixtures/eval-option')
            .frontmatter(false)
            .use(frontmatter({eval: false}))
            .build(function(err, files){
              if (err) return done(err);
              assert.equal(files["test.md"].someKey, undefined);
              done();
            });
        });
      });
    });
    describe('lang', function(){
      it('should set the language used for frontmatter', function(done) {
        Metalsmith('test/fixtures/lang-option')
          .frontmatter(false)
          .use(frontmatter({lang: 'javascript', eval: true}))
          .build(function(err, files){
            if (err) return done(err);
            assert.equal(files["test.md"].someKey, "value");
            done();
          });
      });
    });
  });
});

var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , mklevel = require('../../index')
  , Level = require('../../level')
  , utils = require('../util');

function assert(result) {
  // open document
  expect(result[0].type).to.eql(Node.DOCUMENT);

  // cannot perform negative (-10) on level 1
  expect(result[1].type).to.eql(Node.HEADING);
  expect(result[1].level).to.eql(1);

  // level 2 becomes level 3 (+1)
  expect(result[2].type).to.eql(Node.HEADING);
  expect(result[2].level).to.eql(3);

  // level 3 becomes level 5 (+2)
  expect(result[3].type).to.eql(Node.HEADING);
  expect(result[3].level).to.eql(5);

  // level 4 +3 is clamped at 6
  expect(result[4].type).to.eql(Node.HEADING);
  expect(result[4].level).to.eql(6);

  // level 5 -3 becomes level 2
  expect(result[5].type).to.eql(Node.HEADING);
  expect(result[5].level).to.eql(2);

  // level 6 -2 becomes level 4
  expect(result[6].type).to.eql(Node.HEADING);
  expect(result[6].level).to.eql(4);

  // eof main document
  expect(result[7].type).to.eql(Node.EOF);
}

describe('mklevel:', function() {
  
  it('should return stream with no options', function(done) {
    var stream = mklevel();
    expect(stream).to.be.an('object');
    done();
  });

  it('should create stream with no options', function(done) {
    var stream = new Level();
    expect(stream).to.be.an('object');
    done();
  });


  it('should modify heading levels', function(done) {
    var source = 'test/fixtures/levels.md'
      , target = 'target/levels.json.log'
      , data = ast.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = ast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {
          input: input,
          output: output,
          levels: [-10, 1, 2, 3, -3, -2, 'foo']
        };
    
    mklevel(opts);

    output.once('finish', function() {
      var result = utils.result(target);
      assert(result);
      done();
    })
  });

  it('should modify heading levels w/ callback', function(done) {
    var source = 'test/fixtures/levels.md'
      , target = 'target/levels.json.log'
      , data = ast.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data.file = source;

    var input = ast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {
          input: input,
          output: output,
          levels: [-10, 1, 2, 3, -3, -2, 'foo']
        };
    
    function onFinish() {
      var result = utils.result(target);
      assert(result);
      done();
    }

    mklevel(opts, onFinish);
  });

});

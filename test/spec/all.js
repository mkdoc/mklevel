var expect = require('chai').expect
  , fs = require('fs')
  , ast = require('mkast')
  , Node = ast.Node
  , mklevel = require('../../index')
  , utils = require('../util');

function assert(result) {
  // open document
  expect(result[0].type).to.eql(Node.DOCUMENT);

  expect(result[1].type).to.eql(Node.HEADING);
  expect(result[1].level).to.eql(2);

  expect(result[2].type).to.eql(Node.HEADING);
  expect(result[2].level).to.eql(3);

  expect(result[3].type).to.eql(Node.HEADING);
  expect(result[3].level).to.eql(4);

  expect(result[4].type).to.eql(Node.HEADING);
  expect(result[4].level).to.eql(5);

  expect(result[5].type).to.eql(Node.HEADING);
  expect(result[5].level).to.eql(6);

  expect(result[6].type).to.eql(Node.HEADING);
  expect(result[6].level).to.eql(6);

  // eof main document
  expect(result[7].type).to.eql(Node.EOF);
}

describe('mklevel:', function() {
  
  it('should modify all heading levels w/ all option', function(done) {
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
          all: 1
        };
    
    mklevel(opts);

    output.once('finish', function() {
      var result = utils.result(target);
      assert(result);
      done();
    })
  });

});

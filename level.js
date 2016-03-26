var through = require('through3')
  , Node = require('mkast').Node;

/**
 *  Increases and decreases heading levels.
 *
 *  @constructor Level
 *  @param {Object} [opts] stream options.
 */
function Level(opts) {
  opts = opts || {};
  opts.levels = opts.levels || [];

  // coerce to integers and handle NaN
  this.levels = opts.levels.map(function(num) {
    return parseInt(num) || 0;
  })
}

/**
 *  Stream transform.
 *
 *  @private {function} transform
 *  @member Level
 *
 *  @param {Array} node input AST node.
 *  @param {String} encoding character encoding.
 *  @param {Function} callback function.
 */
function transform(chunk, encoding, cb) {

  if(Node.is(chunk, Node.HEADING)) {
    // do we have a rule for this level 
    var rule = this.levels[chunk.level - 1]
      , lvl = chunk.level + rule;

    // constrain to supported range
    if(lvl < 1) {
      lvl = 1; 
    }else if(lvl > 6) {
      lvl = 6; 
    }

    // update node info
    chunk.level = lvl;
  }

  this.push(chunk);
  cb();
}

module.exports = through.transform(transform, {ctor: Level})

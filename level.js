var through = require('through3')
  , Node = require('mkast').Node;

/**
 *  Increases and decreases heading levels.
 *
 *  Takes the integer values in the `levels` option and applies them by index 
 *  to the headings in the stream.
 *
 *  The level modifier for level one headings is at index zero in the list.
 *
 *  If a level modifier would take a heading level beyond the permitted 1-6 
 *  range the value is clamped, so the following is a noop:
 *
 *  ```javascript
 *  {levels: [-1]}
 *  ```
 *
 *  Because level one headings cannot be modified below one.
 *
 *  To convert all level one headings to level two:
 *
 *  ```javascript
 *  {levels: [1]}
 *  ```
 *
 *  To increment headings 1-4 by one:
 *
 *  ```javascript
 *  {levels: [1,1,1,1]}
 *  ```
 *
 *  To decrement all heading levels (except level 1) by one:
 *
 *  ```javascript
 *  {levels: [0,-1,-1,-1,-1,-1]}
 *  ```
 *
 *  @constructor Level
 *  @param {Object} [opts] stream options.
 *  @option {Array} levels list of integer level modifiers.
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

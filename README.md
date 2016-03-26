# Level

[![Build Status](https://travis-ci.org/mkdoc/mklevel.svg?v=3)](https://travis-ci.org/mkdoc/mklevel)
[![npm version](http://img.shields.io/npm/v/mklevel.svg?v=3)](https://npmjs.org/package/mklevel)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mklevel/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/mkdoc/mklevel?branch=master)

> Indent and outdent heading levels

Increases and decreases heading levels so the structure of a document may be modified.

## Install

```
npm i mklevel --save
```

For the command line interface install [mkdoc][] globally (`npm i -g mkdoc`).

---

- [Install](#install)
- [Usage](#usage)
- [Help](#help)
- [API](#api)
   - [level](#level)
   - [Level](#level-1)
- [License](#license)

---

## Usage

Create the stream and write a [commonmark][] document:

```javascript
var lvl = require('mklevel')
  , ast = require('mkast');
ast.src('# 1\n\n## 2\n\n### 3\n\n')
  .pipe(lvl({levels: [1, 2, -1, 0, 0, 0]}))
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
```

## Help

```
mklevel [options]

Modify heading levels.

  -h, --help  Display this help and exit
  --version   Print the version and exit

Report bugs to https://github.com/mkdoc/mklevel/issues
```

## API

### level

```javascript
level([opts][, cb])
```

Gets the heading level stream.

Returns an output stream.

* `opts` Object processing options.
* `cb` Function callback function.

#### Options

* `input` Readable input stream.
* `output` Writable output stream.

### Level

```javascript
new Level([opts])
```

Increases and decreases heading levels.

* `opts` Object stream options.

## License

MIT

---

Created by [mkdoc](https://github.com/mkdoc/mkdoc) on March 26, 2016

[mkdoc]: https://github.com/mkdoc/mkdoc
[mkparse]: https://github.com/mkdoc/mkparse
[commonmark]: http://commonmark.org
[jshint]: http://jshint.com
[jscs]: http://jscs.info


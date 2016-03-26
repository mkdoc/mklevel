# Heading Levels

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
- [Example](#example)
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

## Example

Increment all heading levels:

```shell
mkcat README.md | mklevel --all=1 | mkout
```

Decrement all heading levels:

```shell
mkcat README.md | mklevel --all=-1 | mkout
```

Convert level 2 headings to level 5:

```shell
mkcat README.md | mklevel -2=3 | mkout
```

Convert level 1 and 3 headings to level 2:

```shell
mkcat README.md | mklevel -1=1 -3=-1 | mkout
```

## Help

```
mklevel [options]

Modify heading levels.

  -1=[NUM]         Modify level 1 headings by NUM
  -2=[NUM]         Modify level 2 headings by NUM
  -3=[NUM]         Modify level 3 headings by NUM
  -4=[NUM]         Modify level 4 headings by NUM
  -5=[NUM]         Modify level 5 headings by NUM
  -6=[NUM]         Modify level 6 headings by NUM
  -a, --all=[NUM]  Modify all headings by NUM
  -h, --help       Display this help and exit
  --version        Print the version and exit

Report bugs to https://github.com/mkdoc/mklevel/issues
```

## API

### level

```javascript
level([opts][, cb])
```

Gets the heading level stream.

See [Level](#level-1) for additional options.

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

Takes the integer values in the `levels` option and applies them by index
to the headings in the stream.

The level modifier for level one headings is at index zero in the list.

If a level modifier would take a heading level beyond the permitted 1-6
range the value is clamped, so the following is a noop:

```javascript
{levels: [-1]}
```

Because level one headings cannot be modified below one.

To convert all level one headings to level two:

```javascript
{levels: [1]}
```

To increment headings 1-4 by one:

```javascript
{levels: [1,1,1,1]}
```

To decrement all heading levels (except level 1 which cannot be
decremented):

```javascript
{all: -1}
```

* `opts` Object stream options.

#### Options

* `levels` Array list of integer level modifiers.
* `all` Number use this value for all levels.

## License

MIT

---

Created by [mkdoc](https://github.com/mkdoc/mkdoc) on March 26, 2016

[mkdoc]: https://github.com/mkdoc/mkdoc
[commonmark]: http://commonmark.org
[jshint]: http://jshint.com
[jscs]: http://jscs.info


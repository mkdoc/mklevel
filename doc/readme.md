# Heading Levels

<? @include readme/badges.md ?>

> Indent and outdent heading levels

Increases and decreases heading levels so the structure of a document may be modified.

<? @include {=readme} install.md ?>

***
<!-- @toc -->
***

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mklevel/gm} usage.js ?>

<? @include {=readme} help.md ?>

<? @exec mkapi index.js level.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>

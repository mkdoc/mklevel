# Heading Levels

<? @include readme/badges.md ?>

> Indent and outdent heading levels

Increases and decreases heading levels so the structure of a document may be modified.

Useful when you have a standalone document that you wish to include in another document but the headings in the standalone document should be indented to fit the structure of the parent document.

<? @include {=readme} install.md ?>

***
<!-- @toc -->
***

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mklevel/gm} usage.js ?>

<? @include {=readme} example.md help.md ?>

<? @exec mkapi index.js level.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>

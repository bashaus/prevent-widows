# prevent-widows

[![npm version][img:npm]][url:npm]
[![build status][img:build-status]][url:build-status]

> Prevent widows from appearing in a string

This module replaces the spaces and hyphens at the end of a paragraph with
non-breaking spaces and non-breaking hyphens to prevent widows from appearing
in a browser.

## Installation

```
npm install prevent-widows
```

## Usage

Prevent widows from appearing in a string.

```
const preventWidows = require('prevent-widows');

const inputText = 'lorem ipsum dolar sit a met';
const outputText = preventWidows(inputText);
// lorem ipsum dolar sit a&nbsp;met
```

## Usage: posthtml

The module can also be used as a [posthtml][url:posthtml] plugin.

```
const posthtml = require('posthtml');
const preventWidows = require('prevent-widows').posthtml;

const inputHTML = '<div prevent-widows>lorem ipsum dolar sit a met</div>';
const outputHTML = posthtml()
  .use(preventWidows())
  .process(inputHTML, { sync: true })
  .html;

// <div>lorem ipsum dolar sit a&nbsp;met</div>
```

[url:posthtml]: https://github.com/posthtml/posthtml

[img:build-status]: https://travis-ci.org/bashaus/prevent-widows.svg
[url:build-status]: https://travis-ci.org/bashaus/prevent-widows

[img:npm]: https://img.shields.io/npm/v/prevent-widows.svg
[url:npm]: https://www.npmjs.com/package/prevent-widows

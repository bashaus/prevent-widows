# prevent-widows

[![npm version][img:npm]][url:npm]
[![build status][img:build-status]][url:build-status]

> Prevent widows from appearing in a string

This module replaces the spaces and hyphens at the end of a paragraph with
non-breaking spaces and non-breaking hyphens to prevent widows.

It comes with out-of-the-box support for strings, or can be integrated with posthtml.

## Installation

```
npm install prevent-widows
```

## Usage

Prevent widows from appearing in a string.

```javascript
const preventWidows = require('prevent-widows');
preventWidows('lorem ipsum dolar sit a met');
// lorem ipsum dolar sit a&nbsp;met
```

## Options

### encoding

Defines the type of output to transform the spaces and hyphens.

* Since: `1.0.0`
* Property is `Optional`
* Default value is: `html`
* Validation rules:
  * Must be a predefined format as a `String` or an `Object`

This table describes how values will be transformed depending on what type of
pre-defined encoding you specify.

| Encoding     | Space character        | Hyphen character       |
|--------------|------------------------|------------------------|
| html         | `&nbsp;`               | `&#8209;`              |
| unicode      | `\u00a0`               | `\u2011`               |

For example:

```javascript
preventWidows('lorem ipsum dolar sit a met', { encoding: 'unicode' });
```

Alternatively, a custom encoding can be defined using an object:

```javascript
preventWidows('lorem ipsum dolar sit a met', {
  encoding: { space: '_', hyphen: '~' }
});

// lorem ipsum dolar sit a_met
```

## posthtml

This module comes with out-of-the-box support for [posthtml][url:posthtml].

### Usage

The posthtml function exposes an additional parameter: `posthtmlOptions`.

```javascript
const posthtml = require('posthtml');
const preventWidows = require('prevent-widows');
posthtml()
  .use(preventWidows.posthtml(posthtmlOptions, options));
```

### Example

```javascript
const posthtml = require('posthtml');
const preventWidows = require('prevent-widows');

const inputHTML = '<div prevent-widows>lorem ipsum dolar sit a met</div>';
const outputHTML = posthtml()
  .use(preventWidows.posthtml())
  .process(inputHTML, { sync: true })
  .html;

// <div>lorem ipsum dolar sit a&nbsp;met</div>
```

### posthtml Options

The posthtml method also comes with the following options:

#### attrName

The name of the attribute which identifies where widows should be prevented on
its children.

* Since: `1.0.0`
* Property is `Optional`
* Default value is: `prevent-widows`
* Validation rules:
  * Must be a valid HTML attribute name

```html
<div prevent-widows>Prevent widows</div>
```

#### attrRemove

Whether or not to remove the attribute (see: `attrName`) from the element after
the transform has been applied.

* Since: `1.0.0`
* Property is `Optional`
* Default value is: `true`
* Validation rules:
  * Must be a boolean value: `true` or `false`

When `true` and by default, this will output:

```html
<div>Prevent widows</div>
```

When `false`, this will output:

```html
<div prevent-widows>Prevent widows</div>
```

[url:posthtml]: https://github.com/posthtml/posthtml

[img:build-status]: https://travis-ci.org/bashaus/prevent-widows.svg
[url:build-status]: https://travis-ci.org/bashaus/prevent-widows

[img:npm]: https://img.shields.io/npm/v/prevent-widows.svg
[url:npm]: https://www.npmjs.com/package/prevent-widows

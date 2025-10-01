# prevent-widows

[![github actions build][img:gh-build]][url:gh-build]
[![code coverage][img:codecov]][url:codecov]

Prevent widows from appearing in a string.

This module replaces the spaces and hyphens at the end of a paragraph with
non-breaking spaces and non-breaking hyphens to prevent widows.

It comes with support for strings and posthtml.

## Installation

```
npm install prevent-widows
# - or -
yarn add prevent-widows
```

## Usage

Prevent widows from appearing in a string.

```javascript
const preventWidows = require("prevent-widows");
preventWidows("lorem ipsum dolar sit a met");
// lorem ipsum dolar sit a&nbsp;met
```

```typescript
import preventWidows from "prevent-widows";
preventWidows("lorem ipsum dolar sit a met");
// lorem ipsum dolar sit a&nbsp;met
```

## Options

### encoding

Defines the type of output to transform the spaces and hyphens.

- Since: `1.0.0`
- Property is `Optional`
- Default value is: `Encodings.HTML`
- Validation rules:
  - Must be a type of `Encoding`

This table describes how values will be transformed depending on what type of
pre-defined encoding you specify.

| Encoding | Space character | Hyphen character |
| -------- | --------------- | ---------------- |
| html     | `&nbsp;`        | `&#8209;`        |
| unicode  | `\u00a0`        | `\u2011`         |

For example:

```typescript
preventWidows("lorem ipsum dolar sit a met", { encoding: Encodings.UNICODE });
```

Alternatively, a custom encoding can be defined using an object:

```typescript
preventWidows("lorem ipsum dolar sit a met", {
  encoding: { space: "_", hyphen: "~" },
});

// lorem ipsum dolar sit a_met
```

## posthtml

This module comes with out-of-the-box support for [posthtml][url:posthtml].

### Usage

The posthtml function exposes an additional parameter: `posthtmlOptions`.

```typescript
import posthtml from "posthtml";
import preventWidows from "prevent-widows";

posthtml().use(preventWidows.posthtml(posthtmlOptions, preventWidowsOptions));
```

### Example

```typescript
import posthtml from "posthtml";
import preventWidows from "prevent-widows";

(async () => {
  const input = "<div prevent-widows>lorem ipsum dolar sit a met</div>";

  const { html } = await posthtml().use(preventWidows.posthtml()).process(input);

  console.log(html);
})();

// <div>lorem ipsum dolar sit a&nbsp;met</div>
```

### posthtml Options

The posthtml method also comes with the following options:

#### attrName

The name of the attribute which identifies where widows should be prevented on
its children.

- Since: `1.0.0`
- Property is `Optional`
- Default value is: `prevent-widows`
- Validation rules:
  - Must be a valid HTML attribute name

```html
<div prevent-widows>Prevent widows</div>
```

#### attrRemove

Whether or not to remove the attribute (see: `attrName`) from the element after
the transform has been applied.

- Since: `1.0.0`
- Property is `Optional`
- Default value is: `true`
- Validation rules:
  - Must be a boolean value: `true` or `false`

When `true` and by default, this will output:

```html
<div>Prevent widows</div>
```

When `false`, this will output:

```html
<div prevent-widows>Prevent widows</div>
```

[url:posthtml]: https://github.com/posthtml/posthtml
[img:codecov]: https://codecov.io/gh/bashaus/prevent-widows/graph/badge.svg?token=D79154VC17
[url:codecov]: https://codecov.io/gh/bashaus/prevent-widows
[img:gh-build]: https://github.com/bashaus/prevent-widows/actions/workflows/build.yml/badge.svg
[url:gh-build]: https://github.com/bashaus/prevent-widows/actions/workflows/build.yml

const ENCODINGS = {
  unicode : { space: '\u00a0' , hyphen: '\u2011' },
  html    : { space: '&nbsp;' , hyphen: '&#8209;' }
};

module.exports = function (text, options) {
  const startAt = text.trimRight().length - 1;

  options = options || {};
  if ('encoding' in options === false) options.encoding = 'html';

  // If the encoding is a string, then it's a default encoding
  let encoding = null;
  if (typeof options.encoding == 'string') {
    encoding = ENCODINGS[options.encoding];
  } else {
    encoding = options.encoding;
  }

  let lastNbsp = -1, lastSpace = -1, lastNbHypen = -1, lastHyphen = -1;

  if (encoding.space) {
    lastNbsp = text.lastIndexOf(encoding.space, startAt);
    lastSpace = text.lastIndexOf(' ', startAt);
  }

  if (encoding.hyphen) {
    lastNbHypen = text.lastIndexOf(encoding.hyphen, startAt);
    lastHyphen = text.lastIndexOf('-', startAt);
  }

  // Identify which character is last
  const lastCharacter = Math.max(lastNbsp, lastSpace, lastNbHypen, lastHyphen);

  // Depending on the last character in the sentence
  switch (lastCharacter) {
    // Single word? Non-breaking character already? Then Do nothing
    case -1:
    case lastNbsp:
    case lastNbHypen:
      return text;

    // Replace space
    case lastSpace:
      return [
        text.substring(0, lastSpace),
        text.substring(lastSpace + 1)
      ].join(encoding.space);

    // Replace hyphens
    case lastHyphen:
      return [
        text.substring(0, lastHyphen),
        text.substring(lastHyphen + 1)
      ].join(encoding.hyphen);
  }
};

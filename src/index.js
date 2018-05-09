module.exports = function (text) {
  const startAt = text.trimRight().length - 1;

  const lastNbsp = text.lastIndexOf('&nbsp;', startAt);
  const lastSpace = text.lastIndexOf(' ', startAt);
  const lastNbHypen = text.lastIndexOf('&#x2011;', startAt);
  const lastHyphen = text.lastIndexOf('-', startAt);

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
      return text.substring(0, lastSpace) + '&nbsp;' + text.substring(lastSpace + 1);

    // Replace hyphens
    case lastHyphen:
      return text.substring(0, lastHyphen) + '&#x2011;' + text.substring(lastHyphen + 1);
  }
};

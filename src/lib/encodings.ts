export type Encoding = {
  space: string;
  hyphen: string;
};

const HTML: Encoding = {
  space: '&nbsp;',
  hyphen: '&#8209;',
};

const UNICODE: Encoding = {
  space: '\u00a0',
  hyphen: '\u2011',
};

export default {
  HTML,
  UNICODE,
};

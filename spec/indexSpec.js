const preventWidows = require('../index.js');
const expect = require('expect');

describe('prevent widows', () => {
  describe('when the last character is a space', () => {
    it('replaces last space with non-breaking space', () => {
      expect(preventWidows('Lorem ipsum'))
        .toEqual('Lorem&nbsp;ipsum');
    });

    it('only replaces last space in sentenance with non-breaking space', () => {
      expect(preventWidows('Lorem ipsum dolar sit a met'))
        .toEqual('Lorem ipsum dolar sit a&nbsp;met');
    });
  });

  describe('when the last character is a non-breaking space', () => {
    it('keeps the non-breaking space', () => {
      expect(preventWidows('Lorem&nbsp;ipsum'))
        .toEqual('Lorem&nbsp;ipsum');
    });

    it('when the last character in a paragraph is a non-breaking space', () => {
      expect(preventWidows('Lorem ipsum dolar sit a&nbsp;met'))
        .toEqual('Lorem ipsum dolar sit a&nbsp;met');
    });
  });

  describe('when the last character is a hyphen', () => {
    it('replaces the last hyphen with a non-breaking hyphen', () => {
      expect(preventWidows('Lorem-ipsum'))
        .toEqual('Lorem&#x2011;ipsum');
    });

    it('replaces the last hyphen in a paragraph with a non-breaking hyphen', () => {
      expect(preventWidows('Lorem ipsum dolar sit a-met'))
        .toEqual('Lorem ipsum dolar sit a&#x2011;met');
    });
  });

  describe('when the last character is a non-breaking hyphen', () => {
    it('keeps the last non-breaking hyphen', () => {
      expect(preventWidows('Lorem&#x2011;ipsum'))
        .toEqual('Lorem&#x2011;ipsum');
    });

    it('keeps the last non-breaking hyphen in the paragraph', () => {
      expect(preventWidows('Lorem ipsum dolar sit a&#x2011;met'))
        .toEqual('Lorem ipsum dolar sit a&#x2011;met');
    });
  });
});

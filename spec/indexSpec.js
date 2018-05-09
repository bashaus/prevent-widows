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
        .toEqual('Lorem&#8209;ipsum');
    });

    it('replaces the last hyphen in a paragraph with a non-breaking hyphen', () => {
      expect(preventWidows('Lorem ipsum dolar sit a-met'))
        .toEqual('Lorem ipsum dolar sit a&#8209;met');
    });
  });

  describe('when the last character is a non-breaking hyphen', () => {
    it('keeps the last non-breaking hyphen', () => {
      expect(preventWidows('Lorem&#8209;ipsum'))
        .toEqual('Lorem&#8209;ipsum');
    });

    it('keeps the last non-breaking hyphen in the paragraph', () => {
      expect(preventWidows('Lorem ipsum dolar sit a&#8209;met'))
        .toEqual('Lorem ipsum dolar sit a&#8209;met');
    });
  });

  /* */

  describe('transforms', () => {
    it('transforms unicode space', () => {
      expect(preventWidows('Lorem ipsum dolar sit a met', { encoding: 'unicode' }))
        .toEqual('Lorem ipsum dolar sit a\u00a0met');
    });

    it('transforms unicode hyphen', () => {
      expect(preventWidows('Lorem ipsum dolar sit a-met', { encoding: 'unicode' }))
        .toEqual('Lorem ipsum dolar sit a\u2011met');
    });
  });

  describe('transforms', () => {
    it('transforms custom space', () => {
      expect(preventWidows('Lorem ipsum dolar sit a met', { encoding: { space: 'X' } }))
        .toEqual('Lorem ipsum dolar sit aXmet');
    });

    it('transforms custom hyphen', () => {
      expect(preventWidows('Lorem ipsum dolar sit a-met', { encoding: { hyphen: 'X' } }))
        .toEqual('Lorem ipsum dolar sit aXmet');
    });
  });
});

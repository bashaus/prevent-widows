const preventWidows = require('../index.js');
const expect = require('expect');

describe('encoding', () => {
  /* default */

  describe('default', () => {
    it('transforms to html by default', () => {
      expect(preventWidows('Lorem ipsum dolar sit a met')).toEqual(
        'Lorem ipsum dolar sit a&nbsp;met'
      );
    });
  });

  /* html */

  describe('html', () => {
    it('transforms html space', () => {
      expect(
        preventWidows('Lorem ipsum dolar sit a met', { encoding: 'html' })
      ).toEqual('Lorem ipsum dolar sit a&nbsp;met');
    });

    it('transforms html hyphen', () => {
      expect(
        preventWidows('Lorem ipsum dolar sit a-met', { encoding: 'html' })
      ).toEqual('Lorem ipsum dolar sit a&#8209;met');
    });
  });

  /* unicode */

  describe('unicode', () => {
    it('transforms unicode space', () => {
      expect(
        preventWidows('Lorem ipsum dolar sit a met', { encoding: 'unicode' })
      ).toEqual('Lorem ipsum dolar sit a\u00a0met');
    });

    it('transforms unicode hyphen', () => {
      expect(
        preventWidows('Lorem ipsum dolar sit a-met', { encoding: 'unicode' })
      ).toEqual('Lorem ipsum dolar sit a\u2011met');
    });
  });

  /* custom */

  describe('custom', () => {
    it('transforms custom space', () => {
      expect(
        preventWidows('Lorem ipsum dolar sit a met', {
          encoding: { space: 'X' },
        })
      ).toEqual('Lorem ipsum dolar sit aXmet');
    });

    it('transforms custom hyphen', () => {
      expect(
        preventWidows('Lorem ipsum dolar sit a-met', {
          encoding: { hyphen: 'X' },
        })
      ).toEqual('Lorem ipsum dolar sit aXmet');
    });
  });
});

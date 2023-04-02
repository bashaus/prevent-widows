import preventWidows from '.';

describe('prevent widows', () => {
  /* edge cases */

  describe('edge cases', () => {
    it('removes whitespace from before a widow', () => {
      expect(preventWidows('Lorem ipsum dolar sit a\n   met')).toEqual(
        'Lorem ipsum dolar sit a&nbsp;met'
      );
    });

    it('does not modify a string of spaces', () => {
      expect(preventWidows('   ')).toEqual('   ');
    });

    it('does not modify an empty string', () => {
      expect(preventWidows('')).toEqual('');
    });

    it('does not modify single words surrounded by spaces', () => {
      expect(preventWidows('   Lorem   ')).toEqual('   Lorem   ');
    });

    it('does not modify single words with spaces left', () => {
      expect(preventWidows('   Lorem')).toEqual('   Lorem');
    });

    it('does not modify single words surrounded by spaces', () => {
      expect(preventWidows('Lorem    ')).toEqual('Lorem    ');
    });
  });

  /* space */

  describe('when the last character is a space', () => {
    it('replaces last space with non-breaking space', () => {
      expect(preventWidows('Lorem ipsum')).toEqual('Lorem&nbsp;ipsum');
    });

    it('only replaces last space in sentenance with non-breaking space', () => {
      expect(preventWidows('Lorem ipsum dolar sit a met')).toEqual(
        'Lorem ipsum dolar sit a&nbsp;met'
      );
    });
  });

  /* non-breaking space */

  describe('when the last character is a non-breaking space', () => {
    it('keeps the non-breaking space', () => {
      expect(preventWidows('Lorem&nbsp;ipsum')).toEqual('Lorem&nbsp;ipsum');
    });

    it('when the last character in a paragraph is a non-breaking space', () => {
      expect(preventWidows('Lorem ipsum dolar sit a&nbsp;met')).toEqual(
        'Lorem ipsum dolar sit a&nbsp;met'
      );
    });
  });

  /* hyphen */

  describe('when the last character is a hyphen', () => {
    it('replaces the last hyphen with a non-breaking hyphen', () => {
      expect(preventWidows('Lorem-ipsum')).toEqual('Lorem&#8209;ipsum');
    });

    it('replaces the last hyphen in a paragraph with a non-breaking hyphen', () => {
      expect(preventWidows('Lorem ipsum dolar sit a-met')).toEqual(
        'Lorem ipsum dolar sit a&#8209;met'
      );
    });
  });

  /* non-breaking hyphen */

  describe('when the last character is a non-breaking hyphen', () => {
    it('keeps the last non-breaking hyphen', () => {
      expect(preventWidows('Lorem&#8209;ipsum')).toEqual('Lorem&#8209;ipsum');
    });

    it('keeps the last non-breaking hyphen in the paragraph', () => {
      expect(preventWidows('Lorem ipsum dolar sit a&#8209;met')).toEqual(
        'Lorem ipsum dolar sit a&#8209;met'
      );
    });
  });
});

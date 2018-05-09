const posthtml = require('posthtml');
const preventWidows = require('../../index.js').posthtml;
const expect = require('expect');

describe('posthtml', () => {
  it('can retain prevent-widows', () => {
    expect(transform(`
      <div prevent-widows>
        <strong>Lorem ipsum</strong>
        <strong>Lorem ipsum</strong>
      </div>
    `, { attrRemove: false })).toEqual(`
      <div prevent-widows>
        <strong>Lorem&nbsp;ipsum</strong>
        <strong>Lorem&nbsp;ipsum</strong>
      </div>
    `);
  });

  it('uses a custom attribute', () => {
    expect(transform(`
      <div no-widows>
        <strong>Lorem ipsum</strong>
        <strong>Lorem ipsum</strong>
      </div>
    `, { attrName: 'no-widows' })).toEqual(`
      <div>
        <strong>Lorem&nbsp;ipsum</strong>
        <strong>Lorem&nbsp;ipsum</strong>
      </div>
    `);
  });

  it('processes child nodes', () => {
    expect(transform(`
      <div prevent-widows>
        <strong>Lorem ipsum</strong>
        <strong>Lorem ipsum</strong>
      </div>
    `)).toEqual(`
      <div>
        <strong>Lorem&nbsp;ipsum</strong>
        <strong>Lorem&nbsp;ipsum</strong>
      </div>
    `);
  });

  it('replaces spaces with mixed prevention', () => {
    expect(transform(`
      <div>
        <span>Lorem ipsum</span>
        <span prevent-widows>Lorem ipsum</span>
      </div>
    `)).toEqual(`
      <div>
        <span>Lorem ipsum</span>
        <span>Lorem&nbsp;ipsum</span>
      </div>
    `);
  });
});

function transform(input, options) {
  options = options || null;

  return posthtml().use(preventWidows(options)).process(input, { sync: true }).html;
}

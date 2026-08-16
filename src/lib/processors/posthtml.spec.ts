import posthtml from "posthtml";

import preventWidows from "./posthtml";

describe("posthtml", () => {
  it("can retain prevent-widows", async () => {
    const input = `
      <div prevent-widows>
        <strong>Lorem ipsum</strong>
        <strong>Lorem ipsum</strong>
      </div>
    `;

    const expected = `
      <div prevent-widows="prevent-widows">
        <strong>Lorem&nbsp;ipsum</strong>
        <strong>Lorem&nbsp;ipsum</strong>
      </div>
    `;

    const { html } = await posthtml()
      .use(preventWidows({ attrRemove: false }))
      .process(input);

    expect(html).toEqual(expected);
  });

  it("uses a custom attribute", async () => {
    const input = `
      <div no-widows>
        <strong>Lorem ipsum</strong>
        <strong>Lorem ipsum</strong>
      </div>
    `;

    const expected = `
      <div>
        <strong>Lorem&nbsp;ipsum</strong>
        <strong>Lorem&nbsp;ipsum</strong>
      </div>
    `;

    const { html } = await posthtml()
      .use(preventWidows({ attrName: "no-widows" }))
      .process(input);

    expect(html).toEqual(expected);
  });

  it("processes child nodes", async () => {
    const input = `
      <div prevent-widows>
        <strong>Lorem ipsum</strong>
        <strong>Lorem ipsum</strong>
      </div>
    `;

    const expected = `
      <div>
        <strong>Lorem&nbsp;ipsum</strong>
        <strong>Lorem&nbsp;ipsum</strong>
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("replaces spaces with mixed prevention", async () => {
    const input = `
      <div>
        <span>Lorem ipsum</span>
        <span prevent-widows>Lorem ipsum</span>
      </div>
    `;

    const expected = `
      <div>
        <span>Lorem ipsum</span>
        <span>Lorem&nbsp;ipsum</span>
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("does not affect non-children tags", async () => {
    const input = `
      <div prevent-widows>
        <span>Lorem ipsum</span>
        <img src="image.jpg">
      </div>
    `;

    const expected = `
      <div>
        <span>Lorem&nbsp;ipsum</span>
        <img src="image.jpg">
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("ignores comment tags", async () => {
    const input = `
      <div prevent-widows>
        <strong>Lorem ipsum dolar sit a-met</strong>
        <!-- html comment -->
      </div>
    `;

    const expected = `
      <div>
        <strong>Lorem ipsum dolar sit a&#8209;met</strong>
        <!-- html comment -->
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("handles nodes without content", async () => {
    const input = `
      <div prevent-widows>
        <img src="test.jpg">
      </div>
    `;

    const expected = `
      <div>
        <img src="test.jpg">
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("handles deeply nested prevent-widows elements", async () => {
    const input = `
      <div prevent-widows>
        <div>
          <span>Lorem ipsum</span>
        </div>
      </div>
    `;

    const expected = `
      <div>
        <div>
          <span>Lorem&nbsp;ipsum</span>
        </div>
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("processes multiple text nodes in sequence", async () => {
    const input = `
      <div prevent-widows>
        <span>Lorem ipsum</span>
        <span>Lorem ipsum</span>
      </div>
    `;

    const expected = `
      <div>
        <span>Lorem&nbsp;ipsum</span>
        <span>Lorem&nbsp;ipsum</span>
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("handles mixed content with custom encoding", async () => {
    const input = `
      <div prevent-widows>
        <span>Lorem ipsum</span>
      </div>
    `;

    const expected = `
      <div>
        <span>Lorem_ipsum</span>
      </div>
    `;

    const { html } = await posthtml()
      .use(preventWidows({}, { encoding: { space: "_", hyphen: "-" } }))
      .process(input);

    expect(html).toEqual(expected);
  });

  it("handles elements without content property", async () => {
    const input = `
      <div prevent-widows>
        <br>
      </div>
    `;

    const expected = `
      <div>
        <br>
      </div>
    `;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });

  it("handles empty prevent-widows element", async () => {
    const input = `<div prevent-widows></div>`;

    const expected = `<div></div>`;

    const { html } = await posthtml().use(preventWidows()).process(input);
    expect(html).toEqual(expected);
  });
});

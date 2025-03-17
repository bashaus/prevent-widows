import posthtml from "posthtml";
import { posthtml as preventWidows } from "../../index";

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
});

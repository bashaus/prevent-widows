import preventWidows, { Encodings } from ".";

describe("preventWidows", () => {
  it("renders", () => {
    const actual = preventWidows("Lorem ipsum", {
      encoding: Encodings.HTML,
    });

    expect(actual).toEqual("Lorem&nbsp;ipsum");
  });
});

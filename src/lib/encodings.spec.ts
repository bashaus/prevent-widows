import preventWidows from ".";
import Encodings from "./encodings";

describe("encoding", () => {
  /* default */

  describe("default", () => {
    it("transforms to html by default", () => {
      const result = preventWidows("Lorem ipsum dolar sit a met");
      expect(result).toEqual("Lorem ipsum dolar sit a&nbsp;met");
    });
  });

  /* html */

  describe("html", () => {
    it("transforms html space", () => {
      const result = preventWidows("Lorem ipsum dolar sit a met", {
        encoding: Encodings.HTML,
      });

      expect(result).toEqual("Lorem ipsum dolar sit a&nbsp;met");
    });

    it("transforms html hyphen", () => {
      const result = preventWidows("Lorem ipsum dolar sit a-met", {
        encoding: Encodings.HTML,
      });

      expect(result).toEqual("Lorem ipsum dolar sit a&#8209;met");
    });
  });

  /* unicode */

  describe("unicode", () => {
    it("transforms unicode space", () => {
      const result = preventWidows("Lorem ipsum dolar sit a met", {
        encoding: Encodings.UNICODE,
      });

      expect(result).toEqual("Lorem ipsum dolar sit a\u00a0met");
    });

    it("transforms unicode hyphen", () => {
      const result = preventWidows("Lorem ipsum dolar sit a-met", {
        encoding: Encodings.UNICODE,
      });

      expect(result).toEqual("Lorem ipsum dolar sit a\u2011met");
    });
  });

  /* custom */

  describe("custom", () => {
    it("transforms custom space", () => {
      const result = preventWidows("Lorem ipsum dolar sit a met", {
        encoding: { space: "X", hyphen: "?" },
      });

      expect(result).toEqual("Lorem ipsum dolar sit aXmet");
    });

    it("transforms custom hyphen", () => {
      const result = preventWidows("Lorem ipsum dolar sit a-met", {
        encoding: { space: "X", hyphen: "?" },
      });

      expect(result).toEqual("Lorem ipsum dolar sit a?met");
    });
  });
});

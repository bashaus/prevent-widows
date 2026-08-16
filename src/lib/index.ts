import Encodings from "./encodings";
import type { Encoding } from "./encodings";

export type PreventWindowsOptions = {
  encoding: Encoding;
};

const defaultPreventWidowsOptions: PreventWindowsOptions = {
  encoding: Encodings.HTML,
};

const preventWidows = (
  text: string,
  customPreventWidowsOptions: Partial<PreventWindowsOptions> = defaultPreventWidowsOptions,
) => {
  const options: PreventWindowsOptions = {
    ...defaultPreventWidowsOptions,
    ...customPreventWidowsOptions,
  };

  const { encoding } = options;
  const startAt = text.trimEnd().length - 1;

  const lastNbsp = text.lastIndexOf(encoding.space, startAt);
  const lastSpace = text.lastIndexOf(" ", startAt);
  const lastNbHyphen = text.lastIndexOf(encoding.hyphen, startAt);
  const lastHyphen = text.lastIndexOf("-", startAt);

  // Identify which character is last
  const lastCharacter = Math.max(lastNbsp, lastSpace, lastNbHyphen, lastHyphen);

  // Is the last character a Single word? Non-breaking character already?
  // Then no action is required
  if ([-1, lastNbsp, lastNbHyphen].includes(lastCharacter)) {
    return text;
  }

  const beforeLastCharacter = text.substring(0, lastCharacter).trimEnd();
  const afterLastCharacter = text.substring(lastCharacter + 1);

  // If there is only one word in the paragraph, do nothing
  if (beforeLastCharacter == "") {
    return text;
  }

  let conjunction = "";

  // Depending on the last character in the sentence
  switch (lastCharacter) {
    // Replace space
    case lastSpace:
      conjunction = encoding.space;
      break;

    // Replace hyphens
    case lastHyphen:
      conjunction = encoding.hyphen;
      break;
  }

  return [beforeLastCharacter, afterLastCharacter].join(conjunction);
};

export default preventWidows;

import Encodings from './encodings';
import type { Encoding } from './encodings';

export type PreventWindowsOptions = {
  encoding: Encoding;
};

const defaultPreventWidowsOptions: PreventWindowsOptions = {
  encoding: Encodings.HTML,
};

const preventWidows = (
  text: string,
  customPreventWidowsOptions: Partial<PreventWindowsOptions> = defaultPreventWidowsOptions
) => {
  const options: PreventWindowsOptions = {
    ...defaultPreventWidowsOptions,
    ...customPreventWidowsOptions,
  };

  const { encoding } = options;
  const startAt = text.trimEnd().length - 1;

  let lastNbsp = -1,
    lastSpace = -1,
    lastNbHypen = -1,
    lastHyphen = -1;

  if (encoding.space) {
    lastNbsp = text.lastIndexOf(encoding.space, startAt);
    lastSpace = text.lastIndexOf(' ', startAt);
  }

  if (encoding.hyphen) {
    lastNbHypen = text.lastIndexOf(encoding.hyphen, startAt);
    lastHyphen = text.lastIndexOf('-', startAt);
  }

  // Identify which character is last
  const lastCharacter = Math.max(lastNbsp, lastSpace, lastNbHypen, lastHyphen);

  // Is the last character a Single word? Non-breaking character already?
  // Then no action is required
  if ([-1, lastNbsp, lastNbHypen].includes(lastCharacter)) {
    return text;
  }

  const beforeLastCharacter = text.substring(0, lastCharacter).trimEnd();
  const afterLastCharacter = text.substring(lastCharacter + 1);

  // If there is only one word in the paragraph, do nothing
  if (beforeLastCharacter == '') {
    return text;
  }

  let conjuction = '';

  // Depending on the last character in the sentence
  switch (lastCharacter) {
    // Replace space
    case lastSpace:
      conjuction = encoding.space;
      break;

    // Replace hyphens
    case lastHyphen:
      conjuction = encoding.hyphen;
      break;
  }

  return [beforeLastCharacter, afterLastCharacter].join(conjuction);
};

export default preventWidows;

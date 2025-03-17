import preventWidows from "./lib";
import Encodings from "./lib/encodings";
import type { Encoding } from "./lib/encodings";
import posthtml from "./lib/processors/posthtml";

export default preventWidows;
export { posthtml, Encodings };
export type { Encoding };

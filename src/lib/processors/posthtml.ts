import type { Node, Plugin } from "posthtml";
import preventWidows, { PreventWindowsOptions } from "..";

export type PosthtmlOptions = {
  attrName: string;
  attrRemove: boolean;
};

const defaultPosthtmlOptions = {
  attrName: "prevent-widows",
  attrRemove: true,
};

const posthtml = (
  customPosthtmlOptions: Partial<PosthtmlOptions> = defaultPosthtmlOptions,
  preventWidowsOptions?: PreventWindowsOptions,
): Plugin<unknown> => {
  const posthtmlOptions = {
    ...defaultPosthtmlOptions,
    ...customPosthtmlOptions,
  };

  function processNodes(nodes: Array<Node | string>) {
    return nodes.map((node) => {
      if (typeof node == "object") {
        if (node.content) {
          node.content = processNodes(node.content);
        }

        return node;
      }

      if (typeof node === "string" && /<!--/g.test(node)) {
        return node;
      }

      return preventWidows(node, preventWidowsOptions);
    });
  }

  return (tree) => {
    const attrMatch = {
      [posthtmlOptions.attrName]: "",
    };

    tree.match({ attrs: attrMatch }, (node) => {
      if (posthtmlOptions.attrRemove) {
        delete node.attrs[posthtmlOptions.attrName];
      } else {
        node.attrs[posthtmlOptions.attrName] = posthtmlOptions.attrName;
      }

      // Apply the content
      if (node.content) {
        node.content = processNodes(node.content);
      }

      return node;
    });
  };
};

export default posthtml;

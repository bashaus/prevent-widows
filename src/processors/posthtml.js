const preventWidows = require('../index.js');

module.exports = function(posthtmlOptions) {
  posthtmlOptions = posthtmlOptions || {};

  if ('attrName' in posthtmlOptions === false) posthtmlOptions.attrName = 'prevent-widows';
  if ('attrRemove' in posthtmlOptions === false) posthtmlOptions.attrRemove = true;

  function processNodes(nodes, options) {
    return nodes.map(node => {
      if (typeof node == 'object') {
        if (node.content) node.content = processNodes(node.content, options);
        return node;
      }

      return preventWidows(node, options);
    });
  }

  return function(tree) {
    const attrMatch = {};
    attrMatch[posthtmlOptions.attrName] = true;

    tree.match({ attrs: attrMatch }, node => {
      if (posthtmlOptions.attrRemove) {
        delete node.attrs[posthtmlOptions.attrName];
      } else {
        node.attrs[posthtmlOptions.attrName] = true;
      }

      // Apply the content
      node.content = processNodes(node.content, posthtmlOptions);

      return node;
    });
  };
};

const preventWidows = require('../index.js');

module.exports = function(options) {
  options = options || {};

  if ('attrName' in options === false) options.attrName = 'prevent-widows';
  if ('attrRemove' in options === false) options.attrRemove = true;

  return function(tree) {
    const attrMatch = {};
    attrMatch[options.attrName] = true;

    tree.match({ attrs: attrMatch }, node => {
      if (options.attrRemove) {
        delete node.attrs[options.attrName];
      } else {
        node.attrs[options.attrName] = true;
      }

      // Apply the content
      node.content = processNodes(node.content);

      return node;
    });
  };
};

function processNodes(nodes) {
  return nodes.map(node => {
    if (typeof node == 'object' && node.content) {
      node.content = processNodes(node.content);
      return node;
    }

    if (typeof node == 'string') {
      return preventWidows(node);
    }

    return node;
  });

  return nodes;
}

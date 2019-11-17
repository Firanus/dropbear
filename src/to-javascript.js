const generate = require('@babel/generator').default;
const { traverse } = require('./traverse');

const babelVisitor = {
  CallExpression: {
    enter({ node }) {
      node.callee = { type: 'Identifier', name: node.name };
    },
  },
};

const toJavaScript = ast => {
  traverse(ast, babelVisitor); // We mutate the tree. This is fine.
  return generate(ast).code;
};

module.exports = {
  toJavaScript,
};

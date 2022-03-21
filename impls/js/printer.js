const { SymbolType, StringType } = require('./types');

function pr_str(ast, print_readably = false) {
  if (Array.isArray(ast)) {
    let str = '(';

    ast.forEach((elem) => {
      if (Array.isArray(elem)) str += pr_str(elem);
      else str += pr_str(elem) + ' ';
    });

    return str.trim() + ')';
  }

  if (ast instanceof SymbolType) return ast.value;
  if (ast instanceof StringType) return ast.value;
  else if (ast === null) return 'nil';
  else if (ast?.type === 'function') return '#<function>';
  return ast;
}

module.exports = { pr_str };

const SymbolType = require('./types');

function pr_str(ast) {
  if (Array.isArray(ast)) {
    let str = '(';

    ast.forEach((elem) => {
      if (Array.isArray(elem)) str += pr_str(elem);
      else if (elem instanceof SymbolType) str += elem.value + ' ';
      else if (elem === null) str += 'nil ';
      else str += elem + ' ';
    });

    return str.trim() + ')';
  }

  if (ast instanceof SymbolType) return ast.value;
  return ast;
}

module.exports = { pr_str };

function pr_str(ast) {
  if (Array.isArray(ast)) {
    let str = '(';

    ast.forEach((elem) => {
      if (Array.isArray(elem)) str += pr_str(elem);
      else str += elem + ' ';
    });

    return str.trim() + ')';
  }

  return ast;
}

module.exports = { pr_str };

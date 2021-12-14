const Env = require('./env');
const { pr_str } = require('./printer');
const { read_str } = require('./reader');
const SymbolType = require('./types');

let readline;

if (typeof module !== 'undefined') {
  readline = require('./node_readline');
}

function READ(input) {
  const ast = read_str(input);
  return ast;
}

const repl_env = new Env();
repl_env.set('+', (a, b) => a + b);
repl_env.set('-', (a, b) => a - b);
repl_env.set('*', (a, b) => a * b);
repl_env.set('/', (a, b) => a / b);
repl_env.set('^', (a, b) => a ** b);

function eval_ast(ast, env) {
  if (ast instanceof SymbolType) {
    return repl_env.get(ast.value);
  } else if (Array.isArray(ast)) {
    return ast.map((a) => EVAL(a, env));
  }

  return ast;
}

function EVAL(ast, env) {
  if (!Array.isArray(ast)) {
    return eval_ast(ast, env);
  } else {
    if (ast.length === 0) return ast;

    const evaluated_list = eval_ast(ast, env);
    const func = evaluated_list[0];
    const [first, ...args] = evaluated_list;

    let val;

    if (args[0] && args[1]) {
      val = func(args[0], args[1]);
    }

    for (let i = 2; i < args.length; i++) {
      val = func(val, args[i]);
    }

    return val;
  }
}

function PRINT(input) {
  return pr_str(input);
}

function rep(input) {
  try {
    let ast = READ(input);
    let result = EVAL(ast, repl_env);

    return PRINT(result);
  } catch (error) {
    console.log(error.message);
  }
}

// repl loop
if (typeof require !== 'undefined' && require.main === module) {
  // Synchronous node.js commandline mode
  while (true) {
    var line = readline.readline('user> ');
    if (line === null) {
      break;
    }
    if (line) {
      console.log(rep(line));
    }
  }
}

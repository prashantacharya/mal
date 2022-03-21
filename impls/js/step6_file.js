const { ns } = require('./core');
const Env = require('./env');
const { pr_str } = require('./printer');
const { read_str } = require('./reader');
const { SymbolType } = require('./types');
const { apply } = require('./util');
const colors = require('colors');

let readline;

if (typeof module !== 'undefined') {
  readline = require('./node_readline');
}

function READ(input) {
  const ast = read_str(input);
  return ast;
}

const repl_env = new Env();
Object.keys(ns).forEach((key) => {
  repl_env.set(key, ns[key]);
});

repl_env.set('eval', (ast) => EVAL(ast, repl_env));

function eval_ast(ast, env) {
  if (ast instanceof SymbolType) {
    return env.get(ast.value);
  } else if (Array.isArray(ast)) {
    return ast.map((a) => EVAL(a, env));
  }

  return ast;
}

function EVAL(ast, env) {
  while (true) {
    if (!Array.isArray(ast)) {
      return eval_ast(ast, env);
    } else {
      if (ast.length === 0) return ast;

      switch (ast[0].value) {
        case 'def!':
          const variableName = ast[1].value;
          const value = EVAL(ast[2], env);
          return env.set(variableName, value);

        case 'let*':
          const newEnv = new Env(env);
          const a1 = ast[1],
            a2 = ast[2];
          for (let i = 0; i < a1.length; i += 2) {
            newEnv.set(a1[i].value, EVAL(a1[i + 1], newEnv));
          }

          env = newEnv;
          ast = a2;
          break;

        case 'do':
          const evalList = ast.slice(1, -1);
          eval_ast(evalList, env);
          ast = ast[ast.length - 1];
          break;

        case 'if':
          const cond = EVAL(ast[1], env);
          ast = cond ? ast[2] : ast[3];
          break;

        case 'fn*':
          return {
            type: 'function',
            ast: ast[2],
            params: ast[1],
            env,
            fn: function (...args) {
              const funcEnv = new Env(env, ast[1], args);
              return EVAL(ast[2], funcEnv);
            },
          };

        default:
          const evaluated_list = eval_ast(ast, env);

          if (evaluated_list?.type !== 'function') {
            const [func, ...args] = evaluated_list;

            if (func?.type === 'function') {
              return apply(func.fn, args);
            }

            return apply(func, args);
          }
      }
    }
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
    console.error(colors.bold.red(error.message));
  }
}

rep('(def! not (fn* (a) (if a false true)))');
rep(
  `
  (def! load-file (
      fn* (f) (
        eval (
          read-string (
            concat "(do " (slurp f) ")"
          )
        )
      )
    )
  )
`
);

//console.log(process.argv);

if (process.argv[2]) {
  rep(`(load-file "${process.argv[2]}")`);
} else {
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
}

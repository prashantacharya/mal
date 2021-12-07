const { pr_str } = require('./printer');
const { read_str } = require('./reader');

let readline;

if (typeof module !== 'undefined') {
  readline = require('./node_readline');
}

function READ(input) {
  const ast = read_str(input);
  return ast;
}

function EVAL(input) {
  return input;
}

function PRINT(input) {
  return pr_str(input);
}

function rep(input) {
  try {
    let ast = READ(input);
    let result = EVAL(ast);

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

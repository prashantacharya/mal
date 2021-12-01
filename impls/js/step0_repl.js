const prompt = require('prompt-sync')({ sigint: true });

function READ(input) {
  return input;
}

function EVAL(input) {
  return input;
}

function PRINT(input) {
  return input;
}

function rep(input) {
  let ast = READ(input);
  let result = EVAL(ast);

  return PRINT(result);
}

if (typeof require !== 'undefined' && require.main === module) {
  // Synchronous node.js commandline mode
  while (true) {
    var line = prompt('user> ');
    if (line === null) {
      break;
    }
    if (line) {
      console.log(rep(line));
    }
  }
}

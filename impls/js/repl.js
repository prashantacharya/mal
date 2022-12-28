let readline;

if (typeof module !== 'undefined') {
  readline = require('./node_readline');
}

const { rep } = require('./step6_file');

while (true) {
  var line = readline.readline('user> ');
  if (line === null) {
    break;
  }
  if (line) {
    console.log(rep(line));
  }
}

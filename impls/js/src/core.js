const { pr_str } = require('./printer');

const ns = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '=': (a, b) => a === b,
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
  '^': (a, b) => a ** b,
  '%': (a, b) => a % b,
  prn: (val) => {
    pr_str(val, true);
    return null;
  },
  list: (...args) => args,
  'list?': (arg) => Array.isArray(arg),
  'empty?': (arg) => Array.isArray(arg) && arg.length === 0,
  count: (arg) => arg.length,
};

module.exports = { ns };

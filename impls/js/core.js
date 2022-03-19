const { pr_str } = require('./printer');

const ns = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '=': (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((x, i) => x === b[i]);
    }

    return a === b;
  },
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
  list: (a, b) => {
    if (a === undefined) {
      return [];
    }

    if (b === undefined) {
      return [a];
    }

    if (Array.isArray(a)) {
      a.push(b);
      return a;
    }

    return [a, b];
  },
  'list?': (arg) => Array.isArray(arg),
  'empty?': (arg) => Array.isArray(arg) && arg.length === 0,
  count: (arg) => {
    return arg ? arg.length : 0;
  },
};

module.exports = { ns };

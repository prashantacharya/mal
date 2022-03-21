const { pr_str } = require('./printer');
const { read_str } = require('./reader');
const { StringType } = require('./types');

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
  str: (...args) => {
    const res = args.map(pr_str).join('');
    console.log(res);
    return res;
  },
  prn: (val) => {
    const res = pr_str(val, true);
    console.log(res);
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
  'read-string': (str) => {
    const ast = read_str(str.value);
    return ast;
  },
  slurp: (path) => {
    const fs = require('fs');
    return new StringType(fs.readFileSync(path.value, 'utf8'));
  },
  concat: (a, b) => {
    return new StringType(`${a.value}${b.value}`);
  },
};

module.exports = { ns };

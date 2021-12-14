const SymbolType = require('./types');

class Env {
  constructor(outer) {
    this.outer = outer || null;
    this.data = {};
  }

  set(key, value) {
    if (!key instanceof SymbolType) throw new Error('Key must be a symbol');

    this.data[key] = value;
    return value;
  }

  find(key) {
    if (this.data[key]) {
      return this.data;
    } else if (this.outer) {
      return this.outer.find(key);
    } else {
      return null;
    }
  }

  get(key) {
    const val = this.find(key);

    if (val) return val[key];
    else throw new Error(`Symbol ${key} not found`);
  }
}

module.exports = Env;

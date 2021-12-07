class Reader {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
  }

  next() {
    return this.tokens[this.position++];
  }

  peek() {
    return this.tokens[this.position];
  }
}

function read_str(expression) {
  const tokens = tokenize(expression);
  if (tokens.length === 0) throw new Error('');

  const r = new Reader(tokens);
  return read_form(r);
}

function read_form(reader) {
  let token = reader.peek();

  if (token === '(') return read_list(reader);
  else if (token === ')')
    throw new Error(`.*\n.*(EOF|end of input|unbalanced).*`);
  else return read_atom(reader);
}

function read_list(reader) {
  let token = reader.next();
  const ast = [];

  while ((token = reader.peek() !== ')')) {
    if (!token) {
      throw new Error('Expected ), got EOF');
    }

    ast.push(read_form(reader));
  }

  reader.next();
  return ast;
}

function read_atom(reader) {
  let token = reader.next();

  if (!token) throw new Error('unexpected error');

  if (token?.match(/^-?[0-9]+$/)) {
    return parseInt(token, 10); // integer
  } else if (token?.match(/^-?[0-9][0-9.]*$/)) {
    return parseFloat(token, 10); // float
  } else {
    return token;
  }
}

function tokenize(expression) {
  let tokens = [];
  let cursorPosition = 0;

  while (cursorPosition < expression.length) {
    const currentChar = expression[cursorPosition];

    if (currentChar === ' ' || currentChar === ',' || currentChar === '\n') {
      cursorPosition++;
      continue;
    }

    if (currentChar === ';') {
      cursorPosition++;

      for (;;) {
        const charAtCursor = expression[cursorPosition];

        if (charAtCursor === '\n' || !charAtCursor) {
          break;
        }

        cursorPosition++;
      }

      cursorPosition++;
      continue;
    }

    if (currentChar === '~') {
      const next = expression[cursorPosition + 1];
      if (next === '@') {
        tokens.push('~@');
        cursorPosition += 2;
        continue;
      }
    }

    if ("[]{}()'`~^@".includes(currentChar)) {
      tokens.push(currentChar);
      cursorPosition++;
      continue;
    }

    if (currentChar === '"') {
      let value = currentChar;

      cursorPosition++;

      for (;;) {
        const charAtCursor = expression[cursorPosition];
        const charPrevCursor = expression[cursorPosition - 1];

        if (charAtCursor !== '"') {
          if (cursorPosition === expression.length)
            return new Error('.*\n.*(EOF|end of input|unbalanced).*');

          value += charAtCursor;
          cursorPosition++;
        }

        if (charAtCursor === '"') {
          value += charAtCursor;
          cursorPosition++;

          if (charPrevCursor === '\\') continue;
          else break;
        }
      }

      tokens.push(value);

      continue;
    }

    if (currentChar) {
      let value = currentChar;

      cursorPosition++;

      for (;;) {
        const charAtCursor = expression[cursorPosition];

        if (
          `~@^{}[](), `.includes(charAtCursor) ||
          !charAtCursor ||
          charAtCursor === '\n'
        ) {
          break;
        }

        value += charAtCursor;
        cursorPosition++;
      }

      tokens.push(value);
      continue;
    }

    return new Error(`Invalid Token: ${currentChar}`);
  }

  return tokens;
}

module.exports = { read_str };

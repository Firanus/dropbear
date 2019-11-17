const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = input => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      tokens.push({
        type: 'Number',
        value: parseInt(character),
      })
      cursor++;
      continue;
    }

    if (isLetter(character)) {
      tokens.push({
        type: 'Name',
        value: character,
      });
      cursor++;
      continue;
    }

    throw new Error(`${character} is not valid`);
  }

  return tokens;
};

module.exports = { tokenize };

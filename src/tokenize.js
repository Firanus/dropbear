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
      let numberString = character;
      
      while(isNumber(input[++cursor])) {
        numberString += input[cursor];
      }

      tokens.push({
        type: 'Number',
        value: parseInt(numberString),
      })

      continue;
    }

    if (isLetter(character)) {
      let word = character;

      while(isLetter(input[++cursor])) {
        word += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: word,
      });

      continue;
    }

    if(isQuote(character)) {
      let string = '';

      while(!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      // Should have an error condition here for unclosed Strings.
      // Also, all kinds of stuff, like escaping special characters etc.
      // Screw that for now, this is an exercise.

      tokens.push({
        type: 'String',
        value: string,
      });

      cursor++;
      continue;
    }

    throw new Error(`${character} is not valid`);
  }

  return tokens;
};

module.exports = { tokenize };

import * as lib from '../../common';

function check() {
  console.log(lib.faker.helpers.randomize());
  console.log(lib.faker.helpers.slugify());
  console.log(lib.faker.helpers.replaceSymbolWithNumber());
  console.log(lib.faker.helpers.replaceSymbols());
  console.log(lib.faker.helpers.shuffle());
  console.log(lib.faker.helpers.mustache());

  console.log(lib.faker.helpers.createCard());
  console.log(lib.faker.helpers.contextualCard());
  console.log(lib.faker.helpers.userCard());
  console.log(lib.faker.helpers.createTransaction());
}

export { check };

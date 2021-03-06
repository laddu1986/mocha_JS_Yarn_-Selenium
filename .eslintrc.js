module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {}
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    describe: false,
    xdescribe: false,
    it: false,
    expect: false,
    browser: false,
    before: false,
    after: false,
    xit: false,
    $: false,
    $$: false
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["mocha"],
  rules: {
    "mocha/no-exclusive-tests": "error"
  }
};

var defaults = require('./wdio.mtribes.js').config;
var _ = require('lodash');
var overrides = {
  protocol: 'http',
  host: 'localhost',
  port: '4444',
  path: '',
  maxInstances: 1,
  waitForTimeout: 9999999,
  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: 9999999,
    grep: process.env.npm_config_grep
  },
  debug: true,
  execArgv: ['--inspect=127.0.0.1:5858']
};

exports.config = _.defaultsDeep(overrides, defaults);

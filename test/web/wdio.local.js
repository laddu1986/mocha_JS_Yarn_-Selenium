var defaults = require('./wdio.mtribes.js').config;
var _ = require('lodash');
var overrides = {
  reporters: ['html-format'],
  protocol: 'http',
  host: process.env.SELENIUM_HOST,
  port: '4444',
  path: '',
  //Modify these instead of modifying the mtribes file
  specs: [
    'specs/**/*Test.js' //master
  ],
  // // Patterns to exclude.
  exclude: ['specs/**/helpPageTest.js','specs/experiences/*Test.js','specs/PROD/*Test.js']
};

exports.config = _.defaultsDeep(overrides, defaults);

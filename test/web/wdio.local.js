var defaults = require('./wdio.appcurator.js').config;
var _ = require('lodash');
var overrides = {
  protocol: 'http',
  host: 'localhost',
  port: '4444',
  path: ''
  //Modify these instead of modifying the appcurator file
  // specs: [
  //   'specs/**/*Test.js' //master
  // ],
  // // Patterns to exclude.
  // exclude: ['specs/support/helpPageTest.js']
};

exports.config = _.defaultsDeep(overrides, defaults);

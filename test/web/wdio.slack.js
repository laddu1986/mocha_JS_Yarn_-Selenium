var defaults = require('./wdio.mtribes.js').config;
var _ = require('lodash');
var overrides = {
  reporters: ['slack', 'spec'],
  reporterOptions: {
    slack: {
      notify: process.env.SLACK || true,
      webhook: process.env.SLACK_WEBHOOK,
      notifyOnlyOnFailure: process.env.SLACK_FAIL_ONLY,
      username: 'TestBot',
      results: ''
    }
  },
  specs: [
    'specs/PROD/*Test.js' //master
  ]
  // // Patterns to exclude.
};

exports.config = _.defaultsDeep(overrides, defaults);

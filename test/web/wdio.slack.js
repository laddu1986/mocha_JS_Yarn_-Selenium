var defaults = require('./wdio.mtribes.js').config;
var helper = require('./wdio.helper');
var _ = require('lodash');
var overrides = {
  reporters: ['slack', 'spec'],
  reporterOptions: {
    slack: {
      notify: process.env.SLACK || false,
      webhook: process.env.SLACK_WEBHOOK,
      notifyOnlyOnFailure: process.env.SLACK_FAIL_ONLY || true,
      username: 'TestBot',
      message: `Oh no, we found some issues on ${helper
        .getArg('env')
        .toUpperCase()}, have a look at the recordings here: ${process.env.SELENIUM_HOST}:4444/dashboard/`
    }
  },
  specs: [
    'specs/PROD/*Test.js' //master
  ]
  // // Patterns to exclude.
};

exports.config = _.defaultsDeep(overrides, defaults);

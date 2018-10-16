require('dotenv').config();

const debug = process.env.DEBUG;
const timeoutPeriod = 30000;
const brow = 'chrome';

exports.config = {
  enableNetwork: true,
  capabilities: [
    {
      browserName: brow,
      chromeOptions: {
        args: ['disable-infobars', '--headless', '--incognito', '--ignore-certificate-errors', '--disable-gpu']
      }
    }
  ],
  updateJob: false,
  specs: [
    './test/web/specs/*/*Test.js' //master
  ],
  // Patterns to exclude.
  exclude: [
    './test/web/specs/invites/*Test.js',
    './test/web/specs/support/helpPageTest.js',
    './test/web/specs/spaces/spaceKeyTest.js'
  ],
  suites: {
    accounts: ['./test/web/specs/accounts/*Test.js'],
    organizations: ['./test/web/specs/organizations/*Test.js'],
    spaces: ['./test/web/specs/spaces/*Test.js'],
    support: ['./test/web/specs/support/*Test.js'],
    invites: ['./test/web/specs/invites/*Test.js']
  },
  logLevel: 'silent',
  bail: 5,
  coloredLogs: true,
  waitforTimeout: debug ? 9999999 : timeoutPeriod,
  maxInstances: debug ? 1 : 10,

  framework: 'mocha',
  reporters: ['dot'],
  reporterOptions: {},

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: debug ? 9999999 : timeoutPeriod
  },

  //
  // =====
  // Hooks
  // =====
  // Gets executed before all workers get launched.
  onPrepare() {
    // console.log('On Prepare')
  },

  // Gets executed before test execution begins. At this point you will have access to all global
  // variables like `browser`. It is the perfect place to define custom commands.
  before() {},

  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after() {
    var connection = require('./test/common');
    connection.mysql.close();
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {
    //console.log('On Complete')
  }
};

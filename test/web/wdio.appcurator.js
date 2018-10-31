var helper = require('./wdio.helper');
/* eslint-enable no-undef */
exports.config = {
  protocol: 'http',
  host: 'selenium-hub',
  port: '4444',
  path: '/wd/hub',
  capabilities: [helper.getBrowser()],
  updateJob: false,
  specs: [
    'specs/**/*Test.js' //master
  ],
  exclude: ['specs/support/helpPageTest.js'],
  suites: {
    smoke: [
      'specs/accounts/createAccountTest.js',
      'specs/accounts/signInAndOutTest.js',
      'specs/invites/inviteTest.js',
      'specs/organizations/createOrganizationTest.js',
      'specs/spaces/createSpaceTest.js',
      'specs/tribes/createTribeTest.js'
    ],
    accounts: ['specs/accounts/*Test.js'],
    organizations: ['specs/organizations/*Test.js'],
    spaces: ['specs/spaces/*Test.js'],
    support: ['specs/support/*Test.js'],
    invites: ['specs/invites/*Test.js'],
    tribes: ['specs/tribes/*Test.js'],
    metrics: ['specs/metrics/*Test.js'],
    negative: ['specs/negativeSpecs/*/*Test.js']
  },
  logLevel: 'silent',
  bail: 0,
  coloredLogs: true,
  baseUrl: helper.getEndPoints(),
  waitforTimeout: 20000,
  maxInstances: 5,
  plugins: {},
  framework: 'mocha',
  reporters: ['spec', 'html-format'],
  reporterOptions: {
    htmlFormat: {
      outputDir: 'reports'
    }
  },
  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: 20000,
    grep: process.env.npm_config_grep
  },
  debug: false,
  execArgv: [],
  onPrepare() {},
  before() {
    helper.getEndPoints();
  },
  after() {
    var connection = require('./actions/invite');
    connection.mysql.close();
  },
  onComplete() {}
};

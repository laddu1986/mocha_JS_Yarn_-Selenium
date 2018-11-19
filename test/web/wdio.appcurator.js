let WdioTestRailReporter = require('./node_modules/wdio-testrail-reporter/lib/wdio-testrail-reporter');
var helper = require('./wdio.helper');
exports.config = {
  protocol: 'http',
  host: 'selenium-hub',
  port: '4444',
  path: '/wd/hub',
  capabilities: helper.getBrowser(),
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
  reporters: [WdioTestRailReporter],
  testRailsOptions: {
    domain: process.env.TESTRAIL_URL,
    username: process.env.TESTRAIL_USERNAME,
    password: process.env.TESTRAIL_PASSWORD,
    projectId: process.env.TESTRAIL_PROJECT,
    suiteId: process.env.TESTRAIL_WEB,
    runName: 'Web Test Run'
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

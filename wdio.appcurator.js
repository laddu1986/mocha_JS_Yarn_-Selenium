require('dotenv').config();
const argv = require('yargs').argv;

const brow = 'chrome';

const debug = process.env.DEBUG;
const timeoutPeriod = 30000;

exports.config = {
  // services: ['selenium-standalone', 'chromedriver'],
  //services: ['devtools'],
  enableNetwork: true,
  capabilities: [{
    browserName: brow,
    chromeOptions: {
      args: [
        'disable-infobars',
        //'--headless',
        '--incognito',
        '--ignore-certificate-errors',
        '--disable-gpu'],
    },
    pageLoadStrategy: 'normal'
  }],

  updateJob: false,
  specs: [
    './test/web/specs/invites/joinOrgAfterInviteRevokedTest.js',//master
    // './test/web/specs/invites/joinOrgExpiredInviteTest.js', //master
    //'./test/web/specs/*/*Test.js' //master
  ],
  // Patterns to exclude.
  exclude: [
    './test/web/specs/organizations/leaveOrganizationTest.js', //feature not ready yet
  ],
  suites: {
    accounts: ['./test/web/specs/accounts/*Test.js'],
    organizations: ['./test/web/specs/organizations/*Test.js'],
    spaces: ['./test/web/specs/spaces/*Test.js'],
    support: ['./test/web/specs/support/*Test.js'],
    invites: ['./test/web/specs/invites/*Test.js']
  },

  logLevel: 'silent',
  bail: 2,
  coloredLogs: true,
  // screenshotPath: './errScreens',
  //baseUrl: 'https://my.appcurator.com/',
  waitforTimeout: debug ? 9999999 : timeoutPeriod,
  maxInstances: debug ? 1 : 10,

  plugins: {

    // webdrivercss: {
    //     screenshotRoot: 'my-shots',
    //     failedComparisonsRoot: 'diffs',
    //     misMatchTolerance: 0.05,
    //     screenWidth: [320,480,640,1024]
    // },
    // webdriverrtc: {},
    // browserevent: {}
  },

  framework: 'mocha',
  reporters: ['spec'],


  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: debug ? 9999999 : timeoutPeriod,
  },
  //execArgv: ['--inspect'],

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
  before() {
    const chai = require('chai');

    global.expect = chai.expect;
    chai.Should();
  },

  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after() {
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {
    //console.log('On Complete')

  },
};

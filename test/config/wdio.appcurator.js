require('dotenv').config();
const argv = require('yargs').argv;
// let WdioTestRailReporter = require('/Users/avinash.eediga/Documents/qa/qa-automation/node_modules/wdio-testrail-reporter/lib/wdio-testrail-reporter.js');

// var config = require('config-yml');

const brow = 'chrome';

exports.config = {
  // services: ['selenium-standalone'],
  // services: ['chromedriver', 'devtools'],
  enableNetwork: true,
  capabilities: [{
    browserName: brow,
    chromeOptions: {
      args: ['disable-infobars', '--disable-gpu' ],
    },
    // , '--headless', '--disable-gpu', '--window-size=1200, 700'] }
  }],

  updateJob: false,
  specs: [
    // './test/web/specs/*Test.js',
    './test/web/specs/createOrganizationTest.js',
  ],
  // Patterns to exclude.
  exclude: [
  ],

  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: './errScreens',
  baseUrl: 'https://feature-qa-org.web.appcurator.qa/',
  waitforTimeout: 10000,
  // maxInstances: 3,

  plugins: {
    'wdio-screenshot': {},
    webdriverajax: {},
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
  reporters: ['allure', 'spec'],
  reporterOptions: {
    allure: {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
    },
  },
  // testRailsOptions: {
  //   domain: "testrail.massiveinteractive.com",
  //   username: "abhijeet.daspatnaik@massive.co",
  //   password: "ABHI@dp11",
  //   projectId: P1,
  //   suiteId: S2471,
  //   runName: "My test run"
  // },

  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 20000,
  },

  //
  // =====
  // Hooks
  // =====
  // Gets executed before all workers get launched.
  onPrepare() {
  },

  // Gets executed before test execution begins. At this point you will have access to all global
  // variables like `browser`. It is the perfect place to define custom commands.
  before() {
    const chai = require('chai');

    global.expect = chai.expect;
    chai.Should();

    // const config = require('config-yml');
  },

  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after() {
    // do something
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {

  },
};

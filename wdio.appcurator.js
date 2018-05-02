require('dotenv').config();
const argv = require('yargs').argv;

const brow = 'chrome';

exports.config = {
  // services: ['selenium-standalone', 'chromedriver'],
  // services: ['chromedriver', 'devtools'],
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
  }],

  updateJob: false,
  specs: [
    './test/web/specs/*Test.js',
  //'./test/web/specs/inviteTest.js',
  ],
  // Patterns to exclude.
  exclude: [
    //'./test/web/specs/reRegisterAccountTest.js',
  ],

  logLevel: 'silent',
  bail: 2,
  coloredLogs: true,
  // screenshotPath: './errScreens',
  baseUrl: 'https://my.appcurator.com/',
  waitforTimeout: 10000,
  maxInstances: 20,

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
  reporters: ['allure', 'spec'],
  reporterOptions: {
    allure: {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
    },
  },

  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 30000,
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
  before() {
    const chai = require('chai');

    global.expect = chai.expect;
    chai.Should();
    //console.log('Before')

    // const config = require('config-yml');
  },

  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after() {
    // do something
    //console.log('After')
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {
    //console.log('On Complete')

  },
};

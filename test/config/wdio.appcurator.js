require('dotenv').config();
const argv = require('yargs').argv;
// var config = require('config-yml');

const brow = 'chrome';

exports.config = {
  services: ['selenium-standalone'],
  capabilities: [{
    browserName: brow,
    chromeOptions: { args: ['disable-infobars'] },
  }],

  updateJob: false,
  specs: [
    //'./test/web/specs/*.js',
    './test/api/organizations.js'

  ],
  // Patterns to exclude.
  exclude: [
    // './test/specs/amazonSearchTest.js',
    // './test/specs/amazonShoppingCart.js'
  ],

  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: './errScreens',
  baseUrl: 'https://my.appcurator.com/',
  waitforTimeout: 20000,
  // maxInstances: 3,

  plugins: {
    'wdio-screenshot': {},
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
  reporters: ['allure','spec'],
  reporterOptions: {
    allure: {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
    },
  },


  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 60000,
  },

  //
  // =====
  // Hooks
  // =====
  // Gets executed before all workers get launched.
  onPrepare() {
    console.log('what is the');
    const config = require('config-yml');
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
    // do something
  },
};

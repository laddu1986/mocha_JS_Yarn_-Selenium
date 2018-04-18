require('dotenv').config();
const argv = require('yargs').argv;

const brow = 'chrome';
//const brow = 'firefox';
//const brow = 'safari';
//const brow = 'opera';


const instance = 10

exports.config = {
  services: ['selenium-standalone', 'chromedriver', 'docker'],
  //services: ['chromedriver'],


  capabilities: [
    {
      browserName: brow,
      chromeOptions: {
        args: ['disable-infobars', '--disable-gpu']
      },
      maxInstances: instance,
    },

    // {
    //   browserName: brow,
    //   'moz:firefoxOptions': {
    //     args: [],
    //     //binary: '/usr/local/bin/geckodriver'
    //   },
    //   maxInstances: instance,
    // },

    // {
    //   browserName: brow,
    //   'safari.options': {
    //     technologyPreview: false
    //   },
    //   maxInstances: instance,
    // },

    // {
    //   browserName: brow,
    //   phantomjsOpts: {
    //     webdriverLogfile: 'phantomjs.log',
    //     ignoreSslErrors: true
    //   },
    //   maxInstances: instance,
    //}

    // {
    //   browserName: brow,
    // }
  ],
  dockerLogs: './logs',
  dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
      p: ['4444:4444'],
      shmSize: '2g'
    }
  },

  updateJob: false,
  specs: [
    './test/web/specs/deleteOrganizationTest.js',
    // './test/web/specs/viewOrganizationDashboard.js',
  ],
  // Patterns to exclude.
  exclude: [
  ],

  logLevel: 'silent',
  coloredLogs: true,
  //screenshotPath: './errScreens',
  baseUrl: 'https://feature-qa-org.web.appcurator.qa/',
  waitforTimeout: 10000,
  maxInstances: 10,

  plugins: {
    // 'wdio-screenshot': {},
    // 'webdriverajax': {},
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
  //   username: "",
  //   password: "",
  //   projectId: 1,
  //   suiteId: 2471,
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



//testrail
//node /Users/abhi/git/qa-automation/node_modules/wdio-testrail-reporter/scripts/generate-cases.js /Users/abhi/git/qa-automation/test/wdio.conf.js /Users/abhi/git/qa-automation/test/web/specs

require('dotenv').config();
const argv = require('yargs').argv;

const debug = process.env.DEBUG;
const timeoutPeriod = 30000;

var browsers = {
  chrome_headless: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--disable-infobars',
        '--headless',
        '--incognito',
        '--ignore-certificate-errors',
        '--disable-gpu'],
    }
  },
  chrome: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--start-maximized',
        '--disable-infobars',
        '--incognito',
        '--ignore-certificate-errors',
        '--disable-gpu'],
    }
  },
  firefox: {
    browserName: 'firefox',
    "moz:firefoxOptions": {
      args: [
        '--disable-infobars',
        '--incognito',
        '--ignore-certificate-errors',
        '--disable-gpu'],
    }
  },
  safari: {
    browserName: 'safari',
    safariOptions: {
      args: [
        '--disable-infobars',
        '--incognito',
        '--ignore-certificate-errors',
        '--disable-gpu'],
    }
  },
  ie: {
    browserName: 'internetExplorer',
    internetExplorerOptions: {
      args: [
        '--disable-infobars',
        '--incognito',
        '--ignore-certificate-errors',
        '--disable-gpu'],
    }
  }
}

function getBrowser() {
  let vars, argument;
  process.argv.forEach(function (value) { //here we can overwrite variables (ex. --browser:chrome )
    if (/--.+\:/.test(value)) {
      vars = value.split(':');
      argument = vars[1];
    }
  });
  if (argument == "firefox")
    return browsers.firefox;
  if (argument == "chrome_headless")
    return browsers.chrome_headless;
  if (argument == "safari")
    return browsers.safari;
  if (argument == "ie")
    return browsers.ie;
  else
    return browsers.chrome;
}

exports.config = {
  // services: ['selenium-standalone', 'chromedriver'],
  //services: ['devtools'],
  enableNetwork: true,
  capabilities: [getBrowser()],
  updateJob: false,
  specs: [
    './test/web/specs/*/*Test.js', //master
  ],
  // Patterns to exclude.
  exclude: [
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
  reporters: ['spec', 'html-format'],
  reporterOptions: {
    htmlFormat: {
      outputDir: './test/web/reports'
    },
    allure: {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
    }
  },

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
    //console.log('Before')
    // const config = require('config-yml');
  },

  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after() {
    var connection = require('./test/common')
    connection.mysql.close()
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {
    //console.log('On Complete')
  },
};
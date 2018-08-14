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
        '--disable-gpu',
        '--disable-search-geolocation-disclosure'],
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

var getArgs = function () {
  var vars, browserArg, envArg;

  process.argv.forEach(function (value) { //here we can overwrite variables (ex. --browser:chrome )
    if (/--.+\:/.test(value)) {
      vars = value.split(':');
      if (vars[0] == '--browser') browserArg = vars[1];
      if (vars[0] == '--env') envArg = vars[1];
    }
  });

  if (browserArg == '' || browserArg === undefined)
    browser = browsers.chrome;
  else {
    switch (browserArg) {
      case 'firefox': case 'ff':
        browser = browsers.firefox;
        break;
      case 'chrome_headless': case 'ch': case 'headless_chrome':
        browser = browsers.chrome_headless;
        break;
      case 'safari': case 'saf':
        browser = browsers.safari;
        break;
      case 'ie':
        browser = browsers.ie;
        break;
      default:
        browser = browsers.chrome;
    }
  }

  if (envArg == '' || envArg === undefined) {
    baseURL = process.env.WEB_DEV
    DBName = process.env.SQL_DBNAME_DEV
  }
  else {
    switch (envArg) {
      case 'qa': case 'QA': case 'Qa':
        baseURL = process.env.WEB_QA
        DBName = process.env.SQL_DBNAME_QA
        break;
      case 'dev': case 'DEV': case 'Dev':
        baseURL = process.env.WEB_DEV
        DBName = process.env.SQL_DBNAME_DEV
        break;
      case 'squad': case 'SQUAD': case 'Squad':
        baseURL = process.env.WEB_SQUAD
        DBName = process.env.SQL_DBNAME_DEV
        break;
      default:
        baseURL = process.env.WEB_DEV
        DBName = process.env.SQL_DBNAME_DEV
    }
  }
  return [browser, baseURL]
}

// DBName = getArgs()[2]
// console.log('DBName  1', DBName)
// exports.default = DBName;

exports.config = {
  // services: ['selenium-standalone', 'chromedriver'],
  //services: ['devtools'],
  enableNetwork: true,
  capabilities: [getArgs()[0]],
  updateJob: false,
  specs: [
    './test/web/specs/metrics/labelUserTest.js', //master
    // './test/web/specs/negativeSpecs/*/*Test.js',
  ],
  // Patterns to exclude.
  exclude: [
    './test/web/specs/support/helpPageTest.js',
    './test/web/specs/spaces/spaceKeyTest.js',
  ],
  suites: {
    accounts: ['./test/web/specs/accounts/*Test.js'],
    organizations: ['./test/web/specs/organizations/*Test.js'],
    spaces: ['./test/web/specs/spaces/*Test.js'],
    support: ['./test/web/specs/support/*Test.js'],
    invites: ['./test/web/specs/invites/*Test.js'],
    segments: ['./test/web/specs/segments/*Test.js'],
    metrics: ['./test/web/specs/metrics/*Test.js']
  },
  logLevel: 'silent',
  bail: 2,
  coloredLogs: true,
  // screenshotPath: './errScreens',
  baseUrl: getArgs()[1],
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
    slow: 0,
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: debug ? 9999999 : timeoutPeriod,
    grep: process.env.npm_config_grep,
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
    // var connection = require('./test/common')
    // connection.mysql.close()
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {
    //console.log('On Complete')
  },
};
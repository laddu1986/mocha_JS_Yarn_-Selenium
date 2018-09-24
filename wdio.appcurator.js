require('dotenv').config();
const argv = require('yargs').argv;

const debug = process.env.DEBUG;
const timeoutPeriod = 20000;

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
    getEndPointsFor('DEV')
  }
  else {
    switch (envArg) {
      case 'qa': case 'QA': case 'Qa':
        getEndPointsFor('QA')
        break;
      case 'dev': case 'DEV': case 'Dev':
        getEndPointsFor('DEV')
        break;
      case 'squad': case 'SQUAD': case 'Squad':
        getEndPointsFor('DEV')
        baseURL = process.env.WEB_SQUAD
        break;
      case 'prod': case 'PROD': case 'Prod':
        getEndPointsFor('PROD')
        break;
      default:
        getEndPointsFor('DEV')
    }
  }
  return [browser, baseURL]
}

function getEndPointsFor(ENV) {
  baseURL = process.env[`WEB_${ENV}`]
  MySqlDb = process.env[`MYSQL_DBNAME_${ENV}`]
  MySqlUser = process.env[`MYSQL_USERNAME_${ENV}`]
  MySqlPass = process.env[`MYSQL_PASSWORD_${ENV}`]
  MySqlHost = process.env[`MYSQL_HOSTNAME_${ENV}`]
}


exports.config = {
  // services: ['selenium-standalone', 'chromedriver'],
  enableNetwork: true,
  capabilities: [getArgs()[0]],
  updateJob: false,
  specs: [
    './test/web/specs/*/*Test.js', //master
    './test/web/specs/negativeSpecs/*/*Test.js'
  ],
  // Patterns to exclude.
  exclude: [
    './test/web/specs/support/helpPageTest.js',
    './test/web/specs/spaces/spaceKeyTest.js',
    './test/web/specs/metrics/labelUserTest.js'
  ],
  suites: {
    accounts: ['./test/web/specs/accounts/*Test.js'],
    organizations: ['./test/web/specs/organizations/*Test.js'],
    spaces: ['./test/web/specs/spaces/*Test.js'],
    support: ['./test/web/specs/support/*Test.js'],
    invites: ['./test/web/specs/invites/*Test.js'],
    tribes: ['./test/web/specs/tribes/*Test.js'],
    metrics: ['./test/web/specs/metrics/*Test.js'],
    negative: ['./test/web/specs/negativeSpecs/*/*Test.js']
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
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: debug ? 9999999 : timeoutPeriod,
    grep: process.env.npm_config_grep
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
    var connection = require('./test/web/actions/invite')
    connection.mysql.close()
  },

  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {
    //console.log('On Complete')
  },
}
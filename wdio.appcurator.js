require('dotenv').config();

const debug = process.env.DEBUG;
const timeoutPeriod = 20000;

var browsers = {
  chrome_headless: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-infobars', '--headless', '--incognito', '--ignore-certificate-errors', '--disable-gpu']
    }
  },
  chrome: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--start-maximized', '--disable-infobars', '--incognito', '--ignore-certificate-errors', '--disable-gpu']
    }
  },
  firefox: {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['--disable-infobars', '--incognito', '--ignore-certificate-errors', '--disable-gpu']
    }
  },
  safari: {
    browserName: 'safari',
    safariOptions: {
      args: ['--disable-infobars', '--incognito', '--ignore-certificate-errors', '--disable-gpu']
    }
  },
  ie: {
    browserName: 'internetExplorer',
    internetExplorerOptions: {
      args: ['--disable-infobars', '--incognito', '--ignore-certificate-errors', '--disable-gpu']
    }
  }
};

var getArgs = function() {
  var vars, browserArg, envArg;

  process.argv.forEach(function(value) {
    //here we can overwrite variables (ex. --browser:chrome )
    if (/--.+:/.test(value)) {
      vars = value.split(':');
      if (vars[0] == '--browser') browserArg = vars[1];
      if (vars[0] == '--env') envArg = vars[1];
    }
  });
  /* eslint-disable no-global-assign */
  if (browserArg == '' || browserArg === undefined) browser = browsers.chrome;
  else {
    switch (browserArg) {
      case 'firefox':
      case 'ff':
        browser = browsers.firefox;
        break;
      case 'chrome_headless':
      case 'ch':
      case 'headless_chrome':
        browser = browsers.chrome_headless;
        break;
      case 'safari':
      case 'saf':
        browser = browsers.safari;
        break;
      case 'ie':
        browser = browsers.ie;
        break;
      default:
        browser = browsers.chrome;
    }
  }
  /* eslint-enable no-global-assign */
  /* eslint-disable no-undef */
  if (envArg == '' || envArg === undefined) {
    getEndPointsFor('DEV');
  } else {
    switch (envArg.toLowerCase()) {
      case 'qa':
        getEndPointsFor('QA');
        break;
      case 'dev':
        getEndPointsFor('DEV');
        break;
      case 'squad':
        getEndPointsFor('DEV');
        baseURL = process.env.WEB_SQUAD;
        break;
      case 'prod':
        getEndPointsFor('PROD');
        break;
      default:
        getEndPointsFor('DEV');
    }
  }
  return [browser, baseURL];
};

function getEndPointsFor(ENV) {
  baseURL = process.env[`WEB_${ENV}`];
  MySqlDb = process.env[`MYSQL_DBNAME_${ENV}`];
  MySqlUser = process.env[`MYSQL_USERNAME_${ENV}`];
  MySqlPass = process.env[`MYSQL_PASSWORD_${ENV}`];
  MySqlHost = process.env[`MYSQL_HOSTNAME_${ENV}`];
}
/* eslint-enable no-undef */
exports.config = {
  // services: ['selenium-standalone', 'chromedriver'],
  enableNetwork: true,
  capabilities: [getArgs()[0]],
  updateJob: false,
  specs: [
    // './test/web/specs/*/*Test.js', //master
    './test/web/specs/metrics/labelUserTest.js' //master

    // './test/web/specs/negativeSpecs/*/*Test.js',
  ],
  // Patterns to exclude.
  exclude: ['./test/web/specs/support/helpPageTest.js'],
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
  baseUrl: getArgs()[1],
  waitforTimeout: debug ? 9999999 : timeoutPeriod,
  maxInstances: debug ? 1 : 10,
  plugins: {},
  framework: 'mocha',
  reporters: ['spec', 'html-format'],
  reporterOptions: {
    htmlFormat: {
      outputDir: './test/web/reports'
    }
  },
  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    compilers: ['js:babel-register'],
    timeout: debug ? 9999999 : timeoutPeriod,
    grep: process.env.npm_config_grep
  },
  debug: debug ? true : false,
  execArgv: debug ? ['--inspect=127.0.0.1:5858'] : [],
  onPrepare() {},
  before() {},
  after() {
    var connection = require('./test/web/actions/invite');
    connection.mysql.close();
  },
  onComplete() {}
};

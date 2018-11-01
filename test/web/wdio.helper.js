if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

function getArg(argType) {
  var vars, arg;
  process.argv.forEach(value => {
    if (/--.+:/.test(value)) {
      vars = value.split(':');
      if (vars[0] == `--${argType}`) {
        arg = vars[1];
      }
    }
  });
  return arg;
}

function getBrowser() {
  let browserType = getArg('browser');
  if (browserType == '' || browserType === undefined) {
    return browsers.chrome_headless;
  } else {
    switch (browserType.toLowerCase()) {
      case 'firefox':
      case 'ff':
        return browsers.firefox;
      case 'chrome':
        return browsers.chrome;
      case 'chrome_headless':
      case 'ch':
      case 'headless_chrome':
        return browsers.chrome_headless;
      case 'safari':
      case 'saf':
        return browsers.safari;
      case 'ie':
        return browsers.ie;
      default:
        return browsers.chrome_headless;
    }
  }
}

function getEndPoints() {
  let environment = getArg('env');
  if (environment == '' || environment === undefined) {
    environment = 'DEV';
  } else {
    environment = environment.toUpperCase();
  }
  /* eslint-disable no-undef */
  baseURL = process.env[`WEB_${environment}`];
  MySqlDb = process.env[`MYSQL_DBNAME_${environment}`];
  MySqlUser = process.env[`MYSQL_USERNAME_${environment}`];
  MySqlPass = process.env[`MYSQL_PASSWORD_${environment}`];
  MySqlHost = process.env[`MYSQL_HOSTNAME_${environment}`];
  identities = process.env[`API_IDENTITIES_${environment}`];
  organizations = process.env[`API_ORGANIZATIONS_${environment}`];
  memberships = process.env[`API_MEMBERSHIPS_${environment}`];
  spaces = process.env[`API_SPACES_${environment}`];
  return baseURL;
  /* eslint-enable no-undef */
}

module.exports = {
  getEndPoints: getEndPoints,
  getBrowser: getBrowser
};

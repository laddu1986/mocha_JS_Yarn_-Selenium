class Page {
  open(path) {
    getEnv()
    browser.windowHandleSize({ width: 1280, height: 800 });
    browser.timeouts('implicit', 10000);
    browser.url(baseURL + `/sign-in`);
  }
}

var baseURL;

function getEnv() {
  var options, env = []
  process.argv.forEach(function (value) { //here we can overwrite variables (ex. --env:qa )
    if (/--.+\:/.test(value)) {
      options = value.split(':');
      if (options[0] == '--env') env.push(options[1]);
    }
  });

  if (env.length == 0)
    return baseURL = process.env.WEB_QA
  else {
    for (let i in env) {
      switch (env[i]) {
        case 'qa': case 'QA': case 'Qa':
          return baseURL = process.env.WEB_QA
        case 'dev': case 'DEV': case 'Dev':
          return baseURL = process.env.WEB_DEV
        case 'squad': case 'SQUAD': case 'Squad':
          return baseURL = process.env.WEB_SQUAD
        default:
          return baseURL = process.env.WEB_QA
      }
    }
  }
}

export default Page;

// Other commonly used browser resolutions
// browser.windowHandleSize({ width: 1280, height: 1024 })
// browser.windowHandleSize({ width: 1920, height: 1200 })
// browser.windowHandleSize({ width: 1280, height: 1200 })
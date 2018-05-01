const config = require('config-yml');

class Page {
  open(path) {
    const base = config.api.base;
    //browser.windowHandleSize({ width: 1280, height: 1024 })
    //browser.windowHandleSize({ width: 1920, height: 1200 })
    //browser.windowHandleSize({ width: 1280, height: 1200 })
    browser.windowHandleSize({ width: 1280, height: 800 })
    //browser.timeouts('page load', 10000)
    browser.timeouts('implicit', 10000);

    //browser.url(base + path);
    browser.url(path)
  }
}

export default Page;
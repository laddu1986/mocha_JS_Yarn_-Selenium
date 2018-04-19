const config = require('config-yml');

class Page {
  open(path) {
    const base = config.api.base;
    //console.log('path =  ' + base + path);
    //browser.windowHandleSize({ width: 1280, height: 1024 })
    //browser.windowHandleSize({ width: 1920, height: 1200 })
    //browser.windowHandleSize({ width: 1280, height: 1200 })
    browser.windowHandleSize({ width: 1280, height: 800 })
    browser.timeouts('implicit', 5000);

    //browser.url(base + path);
    browser.url(base)
  }
}

export default Page;
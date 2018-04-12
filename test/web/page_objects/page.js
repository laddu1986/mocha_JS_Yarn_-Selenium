const config = require('config-yml');

class Page {
  open(path) {
    const base = config.api.base;
    //console.log('path =  ' + base + path);
    browser.url(base + path);
    //browser.url(base)
  }
}

export default Page;
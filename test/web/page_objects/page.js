const config = require('config-yml');

class page {
  open(path) {
    const base = config.api.base;
    //console.log('path =  ' + base + path);
    //browser.url(base + path);
    browser.url(base)
  }
}

export default page;
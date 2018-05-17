import { web } from '../../common';

const config = require('config-yml');

class Page {
  open(path) {
    //const base = config.web.base;
    //console.log('Web  ' + web)


    /* browser.cdp('Network', 'enable')
    browser.on('Network.getResponseBody', (params) => {
      console.log(`Loaded ${params.requestId}`)
    }) */
    // const path = config.api.path;
    // browser.windowHandleSize({ width: 1280, height: 1024 })
    // browser.windowHandleSize({ width: 1920, height: 1200 })
    // browser.windowHandleSize({ width: 1280, height: 1200 })
    browser.windowHandleSize({ width: 1280, height: 800 });
    // browser.timeouts('page load', 10000)
    browser.timeouts('implicit', 10000);

    browser.url(`${web}/sign-in`);
    // browser.url(path)
  }
}

export default Page;

/*

switch (config.url) {
  case 'io':
    url = config.api.iobase + 'sign-in'
    break;
  case 'my':
    url = config.api.mybase
    break;
  case 'squad':
    url = config.api.squadbase
    break;
} */

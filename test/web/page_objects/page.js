import { api } from "config-yml";

class Page {
  open(path) {
    const base = api.base;
    // console.log('path =  ' + base + path);
    browser.url(base + path);
    // browser.url(base);
  }
}

export default Page;
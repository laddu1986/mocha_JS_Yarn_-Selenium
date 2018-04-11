

class Actions {
  // open(path) {
  //   const base = config.api.base;
  //   // console.log('path =  ' + base + path);
  //   // browser.url(base + path);
  //   browser.url(base);
  // }

  waitForElement(wfe) {
    wfe.waitForExist();
    wfe.waitForVisible();
  }

  setValue(sv, data) {
    sv.setValue(data);
  }

  click(c) {
    c.click();
  }
}

export default Actions;


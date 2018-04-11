

// class Actions {
// open(path) {
//   const base = config.api.base;
//   // console.log('path =  ' + base + path);
//   // browser.url(base + path);
//   browser.url(base);
// }

function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  sv.setValue(data);
}

function click(c) {
  c.click();
}
// }

// export default Actions;


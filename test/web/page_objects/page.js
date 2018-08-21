export default class Page {
  open(path) {
    browser.windowHandleSize({ width: 1080, height: 720 });
    browser.timeouts('implicit', 10000);
    browser.url(path);
  }
}

// Other commonly used browser resolutions
// browser.windowHandleSize({ width: 1280, height: 1024 })
// browser.windowHandleSize({ width: 1920, height: 1200 })
// browser.windowHandleSize({ width: 1280, height: 1200 })
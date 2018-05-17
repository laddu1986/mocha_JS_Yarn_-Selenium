import Page from './page';

class common extends Page {
    get successMsg() { return browser.element("//div[@data-qa='notification:success']") }
    get submitButton() { return browser.element("//button[@data-qa='btn:submit']"); }
    get dismissNotification() { return browser.element("//button[@data-qa='btn:dismiss']") }
}

export default new common();
import Page from './page';

class common extends Page {
    get successMsg() { return browser.element("//div[@data-qa='notification:success']") }
    get submitButton() { return browser.element("//*[@data-qa='btn:submit']"); }
}

export default new common();
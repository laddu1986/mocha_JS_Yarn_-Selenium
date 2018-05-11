import Page from './page';

class common extends Page {
    get successMsg() { return browser.element("//div[@data-qa='notification:success']") }
}

export default new common();
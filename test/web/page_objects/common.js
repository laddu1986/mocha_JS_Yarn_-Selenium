import Page from './page';

class common extends Page {
    get successMsg() { return browser.element("//div[@data-qa='notification:success']") }
    get submitButton() { return browser.element("//button[@data-qa='btn:submit']//span"); }
    get dismissNotification() { return browser.element("//button[@data-qa='btn:dismiss']") }
    get invalidInvitationMsg() { return browser.element("//h1") }
    get expiredInvitationMsg() { return browser.element("//*[contains(text(),'expired')]") }
}

export default new common();
import Page from './page';

class common extends Page {
    //passive notification
    get successMsg() { return browser.element("//div[@data-qa='notification:success']") }
    get errorMsg() { return browser.element("//div[@data-qa='notification:error']") }
    get submitButton() { return browser.element("//button[@data-qa='btn:submit']//span"); }
    get dismissNotification() { return browser.element("//button[@data-qa='btn:dismiss']") }

    //Page messages
    get invalidInvitationMsg() { return browser.element("//h1") }
    get expiredInvitationMsg() { return browser.element("//*[contains(text(),'expired')]") }
}

export default new common();
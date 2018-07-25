import Page from './page';

class common extends Page {
    //Common elements
    get submitButton() { return browser.element("//button[@data-qa='btn:submit']//span"); }
    get iAmSureButton() { return browser.element("//button[@data-qa='btn:submit']//span[contains(text(),'sure')]") }
    get invalidPage() { return browser.element("//section[@data-qa='page:404']") }
    get linkOnInvalidpage() { return browser.element("//section[@data-qa='page:404']//a") }
    get userStats() { return browser.elements("//div[contains(@id,'stat')]") }

    //Passive Notifications
    get successMsg() { return browser.element("//div[@data-qa='notification:success']") }
    get errorMsg() { return browser.element("//div[@data-qa='notification:error']") }
    get dismissNotification() { return browser.element("//button[@data-qa='btn:dismiss']") }

    //Page messages
    get invalidInvitationMsg() { return browser.element("//h1") }
    get expiredInvitationMsg() { return browser.element("//*[contains(text(),'expired')]") }

    //Delete Modal (Confirmation prompt for Delete actions)
    get deleteModal() { return browser.element("//form[@data-qa='modal:delete']") }
    get confirmInput() { return browser.element("//form[@data-qa='modal:delete']//input[@data-qa='input:confirm']") }
    get cancelButton() { return browser.element("//button[@data-qa='btn:cancel']") }
    get confirmButton() { return browser.element("//form[@data-qa='modal:delete']//button[@data-qa='btn:submit']"); }
}

export default new common();
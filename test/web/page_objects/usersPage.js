class UsersPage {
    //Users landing page
    get usersTab() { return browser.element("//a[@data-qa='tab:users']"); }
    get userRows() { return browser.elements("//tr[@data-qa='table:row-user']"); }
    get userNameRow() { return browser.elements("//span[@data-qa='row:name']"); }
    get userUIDRow() { return browser.elements("//span[@data-qa='row:id']"); }
    get userEmailRow() { return browser.elements("//td[@data-qa='row:email']"); }
    
    get searchTextField() { return browser.element("//input[@id='user-search']"); }
    get resultFoundText() { return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//p"); }
    get resultsText() { return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//h3"); }

    //User Side Panel
    get userNameSidePanel() { return browser.element("//h3[@data-qa='header:name']"); }
    get userIDSidePanel() { return browser.element("//div[@data-qa='row:id']//div"); }
    get userEmailSidePanel() { return browser.element("//div[@data-qa='row:email']//div"); }
    get deleteUserButton() { return browser.element("//div[@data-qa='panel:delete']//button[@data-qa='btn:submit']//span"); }

    get addLabelButton() { return browser.element("//div[@data-qa='panel:details']//button[@data-qa='btn:submit']"); }
    get labelInput() { return browser.element("//div[@data-qa='panel:details']//input"); }
    get labels() { return browser.elements("//div[@data-qa='panel:details']//div[@class='css-wefl68 css-i2hauk css-i2hauk-deletable']"); }
    get deleteLabelButton() { return browser.element("//div[@data-qa='panel:details']//button[@data-qa=tag:delete]") }

    open(e) {
        super.open(e);
    }
}

export default new UsersPage();
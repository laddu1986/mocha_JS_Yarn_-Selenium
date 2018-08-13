class UsersPage {
    //Users landing page
    get usersTab() { return browser.element("//a[@data-qa='tab:users']"); }
    get userRows() { return browser.elements("//tr[@data-qa='table:row-user']"); }
    get userNameRow() { return browser.elements("//span[@data-qa='row:name']"); }
    get userUIDRow() { return browser.elements("//span[@data-qa='row:id']"); }
    get userEmailRow() { return browser.elements("//td[@data-qa='row:email']"); }
    get userRowLabelCount() { return browser.element("//a[@data-qa='tag:user-row:count']") }

    //User Side Panel
    get userNameSidePanel() { return browser.element("//h3[@data-qa='header:name']"); }
    get userIDSidePanel() { return browser.element("//div[@data-qa='row:id']//div"); }
    get userEmailSidePanel() { return browser.element("//div[@data-qa='row:email']//div"); }
    get deleteUserButton() { return browser.element("//div[@data-qa='panel:delete']//button[@data-qa='btn:submit']//span"); }
    get closeSidePanel() { return browser.element("//button[@title='Close']") }
    get moreButton() { return browser.element("//button[@title='More']") }

    get addLabelButton() { return browser.element("//div[@data-qa='panel:details']//button[@data-qa='btn:reveal-labels']"); }
    get labelInput() { return browser.element("//div[@data-qa='panel:details']//input"); }
    get labels() { return browser.elements("//div[@data-qa='panel:details']//div[@data-qa='tag:user-metrics']"); }
    get deleteLabelButton() { return browser.elements("//div[@data-qa='panel:details']//button[@data-qa='tag:user-metricsbtn:delete']") }
    get addedLabelsDiv() { return browser.element("//div[@data-qa='panel:details']//div[2]") }
    get labelErrMsg() { return browser.element("//div[@data-qa='panel:details']/div[1]/div/span") }
    get labelDropdown() { return browser.elements("//div[@data-qa='panel:details']//div[contains(@id,'downshift')]") }

    open(e) {
        super.open(e);
    }
}

export default new UsersPage();
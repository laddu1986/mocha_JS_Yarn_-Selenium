class UsersPage {
    get usersTab() { return browser.element("//a[@data-qa='tab:users']"); }
    get userRows() { return browser.elements("//tr[@data-qa='table:row-user']"); }
    get userNameRow() { return browser.elements("//span[@data-qa='row:name']"); }
    get userUIDRow() { return browser.elements("//span[@data-qa='row:id']"); }
    get userEmailRow() { return browser.elements("//td[@data-qa='row:email']"); }
    get userNameSideBar() { return browser.element("//h3[@data-qa='header:name']"); }
    get userIDSideBar() { return browser.element("//div[@data-qa='row:id']//div"); }
    get userEmailSideBar() { return browser.element("//div[@data-qa='row:email']//div"); }
    get deleteButton() { return browser.element("//div[@data-qa='panel:delete']//button[@data-qa='btn:submit']//span"); }

    open(e) {
        super.open(e);
    }
}

export default new UsersPage();

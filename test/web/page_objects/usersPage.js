class UsersPage {
    get usersTab() { return browser.element("//a[@data-qa='tab:users']"); }
    get userRows() { return browser.elements("//section[@data-qa='page:space:audience']//table//tr"); }
    get userNameRow() { return browser.elements("//section[@data-qa='page:space:audience']//table//tr//td//span[1]"); }
    get userUIDRow() { return browser.elements("//section[@data-qa='page:space:audience']//table//tr//td//span[2]"); }
    get userEmailRow() { return browser.elements("//section[@data-qa='page:space:audience']//table//tr//td[2]"); }
    get userNameSideBar() { return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//div//h3"); }
    get userIDSideBar() { return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//div[2]//div//div//div"); }
    get userEmailSideBar() { return browser.element("//section[@data-qa='page:space:audience']//div[2]//div//div[2]//div//div[2]//div"); }

    open(e) {
        super.open(e);
    }
}

export default new UsersPage();

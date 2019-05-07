class TeamPage {
  //Active Tab
  get email() {
    return browser.element("//*[@data-qa='page:org-members']");
  }

  //Inactive Tab
  get inactiveTab() {
    return browser.element("//a[@data-qa='tab:inactive']");
  }
  get revokeButton() {
    return browser.element("//button[@data-qa='btn:revoke']");
  }
  get resendButton() {
    return browser.element("//button[@data-qa='btn:resend']");
  }
  get inactiveRowStatus() {
    return browser.element("//tr[@data-qa='table:row-inactive']//td[2]");
  }
  get inactiveTopEmail() {
    return browser.element("(//tr[@data-qa='table:row-active']/td[2])[1]");
  }
  get removeButton() {
    return browser.element("//*[contains(text(),'Remove')]");
  }

  open(e) {
    super.open(e);
  }
}

export default new TeamPage();

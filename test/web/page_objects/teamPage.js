class TeamPage {

  //Active Tab
  get email() { return browser.element("//*[@data-qa='page:org-members']"); }


  //Inactive Tab
  get inactiveTab() { return browser.element("//button[@data-qa='tab:tab-inactive']"); }
  get revokeButton() { return browser.element("//button[@data-qa='btn:submit']//*[contains(text(),'Revoke')]") }
  get resendButton() { return browser.element("//button[@data-qa='btn:submit']//*[contains(text(),'Resend')]") }
  get inactiveRowStatus() { return browser.element("//tr[@data-qa='table:row-inactive']//td[2]") }
  get inactiveTopEmail() { return browser.element("(//tr[@data-qa='table:row-active']/td[2])[1]") }

  open(e) {
    super.open(e);
  }
}

export default new TeamPage();

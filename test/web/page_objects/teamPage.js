class TeamPage {

  get inactiveTab() { return browser.element("//*[contains(text(),'Inactive')]"); }
  get email() { return browser.element("//*[@data-qa='page:org-members']"); }
  get revokeButton() { return browser.element("//button[@data-qa='btn:submit']//*[contains(text(),'Revoke')]") }
  get resendButton() { return browser.element("//button[@data-qa='btn:submit']//*[contains(text(),'Resend')]") }

  open(e) {
    super.open(e);
  }
}

export default new TeamPage();

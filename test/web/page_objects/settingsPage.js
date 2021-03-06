// import Page from './page';

class SettingsPage {
  get orgInput() { return browser.element("//*[@data-qa='input:text']"); }
  get orgError() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']"); }
  get saveOrgNameButton() { return browser.element("//*[@data-qa='btn:save']"); }

  get leaveOrgButton() { return browser.element("//button[@data-qa='btn:leave-org']"); }
  get deleteOrgButton() { return browser.element("//button[@data-qa='btn:leave-org']"); }

  get orgSettingsPage() { return browser.element("//div[@data-qa='menu:profile']//*[contains(text(),'Settings')]"); }

  open(e) {
    super.open(e);
  }
}

export default new SettingsPage();

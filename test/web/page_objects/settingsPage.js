// import Page from './page';

class SettingsPage {
  get emailInput() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:text']"); }
  get emailError() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']"); }
  get saveOrgNameButton() { return browser.element("//*[@data-qa='btn:save']"); }

  get leaveOrgButton() { return browser.element("//button[@data-qa='btn:leave-org']"); }

  get orgSettingsPage() { return browser.element("//*[@data-qa='page:org-settings']") }

  //   open(e) {
  //     // console.log(e);
  //     super.open(e);
  //   }
}

export default new SettingsPage();

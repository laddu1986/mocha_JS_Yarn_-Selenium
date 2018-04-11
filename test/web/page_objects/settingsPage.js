// import Page from './page';

class SettingsPage {
  get emailInput() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:text']"); }
  get emailError() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']"); }
  get saveOrgNameButton() { return browser.element("//*[@data-qa='btn:save']"); }

  get leaveOrgButton() { return browser.element("//*[@data-qa='btn:leave-org']"); }

//   open(e) {
//     // console.log(e);
//     super.open(e);
//   }
}

export default new SettingsPage();
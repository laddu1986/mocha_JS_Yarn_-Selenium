import Page from './page';

export default new class AccountPage extends Page {
  get createAccountLink() { return browser.element("//*[@data-qa='link:register']"); }

  // Input Fields
  get nameInput() { return browser.element("//*[@data-qa='input:name']//*[@data-qa='input:text']"); }
  get emailInput() { return browser.element("//*[@data-qa='input:email']//*[@data-qa='input:text']"); }
  get passwordInput() { return browser.element("//*[@data-qa='input:password']//*[@data-qa='input:text']"); }
  get organizationInput() { return browser.element("//*[@data-qa='input:org']//*[@data-qa='input:text']"); }
  get codeInput() { return browser.element("//*[@data-qa='input:code']//*[@data-qa='input:text']"); }

  // Input Error Msgs
  get nameInputError() { return browser.element("//*[@data-qa='input:name']//*[@data-qa='input:error']"); }
  get emailInputError() { return browser.element("//*[@data-qa='input:email']//*[@data-qa='input:error']"); }
  get passwordInputError() { return browser.element("//*[@data-qa='input:org']//*[@data-qa='input:error']"); }
  get organizationInputError() { return browser.element("//*[@data-qa='input:password']//*[@data-qa='input:error']"); }

  //Join Org
  get joinOrgMsg() { return browser.element("//h2") }

  open() {
    super.open('join');
  }
}
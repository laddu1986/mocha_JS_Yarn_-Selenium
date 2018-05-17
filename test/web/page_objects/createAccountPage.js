import Page from './page';

class CreateAccountPage extends Page {
  get createAccountLink() { return browser.element("//*[@data-qa='link:register']"); }

  // Input Fields
  get nameInput() { return browser.element("//*[@data-qa='input:name']//*[@data-qa='input:text']"); }
  get emailInput() { return browser.element("//*[@data-qa='input:email']//*[@data-qa='input:text']"); }
  get passwordInput() { return browser.element("//*[@data-qa='input:password']//*[@data-qa='input:text']"); }
  get organizationInput() { return browser.element("//*[@data-qa='input:org']//*[@data-qa='input:text']"); }

  // Input Error Msgs
  get nameInputErr() { return browser.element("//*[@data-qa='input:name']//*[@data-qa='input:error']"); }
  get emailInputErr() { return browser.element("//*[@data-qa='input:email']//*[@data-qa='input:error']"); }
  get passwordInputErr() { return browser.element("//*[@data-qa='input:org']//*[@data-qa='input:error']"); }
  get organizationInputErr() { return browser.element("//*[@data-qa='input:password']//*[@data-qa='input:error']"); }

  //Join Org
  get joinOrgMsg(){ return browser.element("//h2")}
  
  open(e) {
    super.open(e);
  }
}

export default new CreateAccountPage();

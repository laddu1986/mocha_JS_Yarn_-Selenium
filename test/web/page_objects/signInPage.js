import Page from './page';

const config = require('config-yml');

class signInPage extends Page {


  get emailInput() { return browser.element("//*[@data-qa='input:email']//*[@data-qa='input:text']"); }
  get emailError() { return browser.element("//*[@data-qa='input:email']//*[@data-qa='input:error']") }

  get passwordInput() { return browser.element("//*[@data-qa='input:password']//*[@data-qa='input:text']"); }
  get passwordError() { return browser.element("//*[@data-qa='input:password']//*[@data-qa='input-error']") }

  get signInButton() { return browser.element("//*[@data-qa='btn:submit']") }

  get forgotPassword() { return browser.element("//*[@data-qa='link:forgot-pw']") }
  get emailSentConfirmation() { return browser.element("//h2") }
  get backToSignIn() { return browser.element("//*[@data-qa='link:sign-in']") }

  open(e) {
    console.log(e);
    super.open(e);
  }


}

export default new signInPage();

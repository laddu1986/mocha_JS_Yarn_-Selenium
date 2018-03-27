import Page from './page';

const config = require('config-yml');

class SignInPage extends Page {


  get emailInput() { return browser.element(config.web.emailInput); }
  get emailError() { return browser.element(config.web.emailError) }

  get passwordInput() { return browser.element(config.web.passwordInput); }
  get passwordError() { return browser.element(config.web.passwordError) }

  //get submit() { return browser.element(config.web.submit); }
  get signInButton() { return browser.element(config.web.signInButton) }
  get successMessage() { return browser.element(config.web.successMessage); }
  get errorMessage() { return browser.element(config.web.errorMessage); }

  get forgotPassword() { return browser.element(config.web.forgotPasswordLink) }
  get emailSentConfirmation() { return browser.element(config.web.emailSentMsg) }
  get backToSignIn() { return browser.element(config.web.backToSignIn) }

  open(e) {
    console.log(e);
    super.open(e);
  }


}

export default new SignInPage();

import Page from './page';

const config = require('config-yml');

class SignInPage extends Page {
  get emailInput() { return browser.element(config.web.emailInput); }
  get passwordInput() { return browser.element(config.web.passwordInput); }
  get submit() { return browser.element(config.web.submit); }
  get successMessage() { return browser.element(config.web.successMessage); }
  get errorMessage() { return browser.element(config.web.errorMessage); }

  open(e) {
    console.log(e);
    super.open(e);
  }


}

export default new SignInPage();

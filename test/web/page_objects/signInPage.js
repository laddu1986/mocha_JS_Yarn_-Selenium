import Page from './page';

const config = require('config-yml');

class SignInPage extends Page {
  get emailInput() { return browser.element(config.web.emailInput); }
  get passwordInput() { return browser.element(config.web.passwordInput); }
  get signInButton() { return browser.element(config.web.signInButton); }
  get signInMessage() { return browser.element(config.web.signInMessage); }

  open(e) {
    console.log(e);
    super.open(e);
  }


}

export default new SignInPage();

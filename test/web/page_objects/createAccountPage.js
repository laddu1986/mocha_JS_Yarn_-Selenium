import Page from './page';

const config = require('config-yml');

class CreateAccountPage extends Page {
  get emailInput() { return browser.element(config.web.emailInput); }
  get passwordInput() { return browser.element(config.web.passwordInput); }
  get nameInput() { return browser.element(config.web.nameInput); }
  get organizationInput() { return browser.element(config.web.organizationInput); }
  get createAccountButton() { return browser.element(config.web.createAccountButton); }
  get signInMessage() { return browser.element(config.web.signInMessage); }

  open(e) {
    console.log(e);
    super.open(e);
  }
}

export default new CreateAccountPage();

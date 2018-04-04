import Page from './page';

const config = require('config-yml');

class CreateAccountPage extends Page {
  get createAccountLink() { return browser.element(config.web.createAccountLink) }
  get emailInput() { return browser.element(config.web.emailInput); }
  get passwordInput() { return browser.element(config.web.passwordInput); }
  get nameInput() { return browser.element(config.web.nameInput); }
  get organizationInput() { return browser.element(config.web.orgInput); }
  get createAccountButton() { return browser.element(config.web.createAccountButton); }
  get signInMessage() { return browser.element(config.web.signInMessage); }
  get welcomeMsg() { return browser.element("//h1") }
  get logo() { return browser.element("//*[@data-qa='nav:logo']"); }




  get organizationErrorMessageSpan() { return browser.element('(//input[@id=\'organisation\']/parent::div/parent::div/span)[1]'); }
  get nameErrorMessageSpan() { return browser.element('(//input[@id=\'name\']/parent::div/parent::div/span)[1]'); }
  get emailErrorMessageSpan() { return browser.element('(//input[@id=\'email\']/parent::div/parent::div/span)[1]'); }
  get passwordErrorMessageSpan() { return browser.element('(//input[@id=\'password\']/parent::div/parent::div/span)[1]'); }
  get organizationValidIconDiv() { return browser.isVisible('//input[@id=\'organisation\']/following-sibling::div[contains(@class, \'valid\')]'); }
  get nameValidIconDiv() { return browser.isVisible('//input[@id=\'name\']/following-sibling::div[contains(@class, \'valid\')]'); }
  get emailValidIconDiv() { return browser.isVisible('//input[@id=\'email\']/following-sibling::div[contains(@class, \'valid\')]'); }
  get passwordValidIconDiv() { return browser.isVisible('//input[@id=\'password\']/following-sibling::div[contains(@class, \'valid\')]'); }
  get organizationInValidIconDiv() { return browser.isVisible('//input[@id=\'organisation\']/following-sibling::div[contains(@class, \'invalid\')]'); }
  get nameInValidIconDiv() { return browser.isVisible('//input[@id=\'name\']/following-sibling::div[contains(@class, \'invalid\')]'); }
  get emailInValidIconDiv() { return browser.isVisible('//input[@id=\'email\']/following-sibling::div[contains(@class, \'invalid\')]'); }
  get passwordInValidIconDiv() { return browser.isVisible('//input[@id=\'password\']/following-sibling::div[contains(@class, \'invalid\')]'); }

  open(e) {
    console.log(e);
    super.open(e);
  }
}

export default new CreateAccountPage();

import CreateAccountPage from '../specs/createAccountTest';

describe('Organization Dashboard', () => {
  it('Checking Organization welcome Dashboard message', () => {
    browser.element('//h1').waitForExist();
    browser.element('//h1').waitForVisible();
    const success = browser.getText('//h1');
    expect(success).to.include('Welcome');
  });
});

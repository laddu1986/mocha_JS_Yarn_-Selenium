import CreateAccountPage from '../specs/createAccountTest';

describe('Organization Dashboard', () => {
  it('Checking Organization welcome Dashboard message', () => {
    browser.element('//h2').waitForExist();
    browser.element('//h2').waitForVisible();
    const success = browser.getText('//h2');
    expect(success).to.include('Welcome');
  });
});

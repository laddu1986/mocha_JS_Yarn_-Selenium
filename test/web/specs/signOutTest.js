import SignOutPage from '../specs/signInTest';


describe('Sign out', () => {
  it('Checking sign out', () => {
    browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').waitForExist();
    browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').waitForVisible();
    browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').click();
    const profileVisibility = browser.isVisible('(//div[contains(@class,\'css-1rq2b0h\')])[2]');
    expect(true).to.equal(profileVisibility);
    browser.element('//*[contains(text(),\'Sign out\')]').waitForExist();
    browser.element('//*[contains(text(),\'Sign out\')]').waitForVisible();
    browser.element('//*[contains(text(),\'Sign out\')]').click();
    const signOutVisibility = browser.isVisible('//*[contains(text(),\'Sign out\')]');
    expect(true).to.equal(signOutVisibility);
  });

  it('Checking redirect to sign in page', () => {
    browser.element('//h2').waitForExist();
    browser.element('//h2').waitForVisible();
    const success = browser.isVisible('//h2');
    expect(true).to.equal(success);
  });
});


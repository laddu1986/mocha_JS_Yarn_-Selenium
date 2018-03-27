import CreateAccountPage from '../specs/createAccountTest';


describe('View Organization setings', () => {
  it('Checking FAQ visibility', () => {
    browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').waitForExist();
    browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').waitForVisible();

    const profileVisibility = browser.isVisible('(//div[contains(@class,\'css-1rq2b0h\')])[2]');
    // console.log(faqVisibility);
    expect(true).to.equal(profileVisibility);
    browser.element('(//div[contains(@class,\'css-1rq2b0h\')])[2]').click();
  });

  it('Checking settings visibility', () => {
    browser.element('//*[contains(text(),\'Settings\')]').waitForExist();
    browser.element('//*[contains(text(),\'Settings\')]').waitForVisible();
    // const helpCenterUrl = browser.getAttribute('//*[contains(text(),\'Help Center\')]/parent::a', 'href');
    // expect('https://help.appcurator.com/').to.equal(helpCenterUrl);
    const settingsVisibility = browser.isVisible('//*[contains(text(),\'Settings\')]');
    // console.log(settingsVisibility + ';;;;;;;;');
    expect(settingsVisibility).to.equal(true);
    browser.element('//*[contains(text(),\'Settings\')]').click();
    
  });
  it('Checking general visibility', () => {
    
    browser.element('//a[contains(text(),\'General\')]').waitForExist();
    browser.element('//a[contains(text(),\'General\')]').waitForVisible();
    const generalVisibility = browser.isVisible('//a[contains(text(),\'General\')]');
    // console.log(generalVisibility + ';;;;;;;;');
    expect(generalVisibility).to.equal(true);
  });
});

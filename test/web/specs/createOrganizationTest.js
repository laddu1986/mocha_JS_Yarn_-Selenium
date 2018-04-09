import SignInTest from '../specs/signInTest';

describe('View Organization setings', () => {
  it('Checking FAQ visibility', () => {
    browser.element('(//*[@theme=\'org\'])[2]').waitForExist();
    browser.element('(//*[@theme=\'org\'])[2]').waitForVisible();

    const profileVisibility = browser.isVisible('(//*[@theme=\'org\'])[2]');
    // console.log(faqVisibility);
    expect(true).to.equal(profileVisibility);
    browser.element('(//*[@theme=\'org\'])[2]').click();
  });

  it('Checking settings visibility', () => {
    browser.element('//*[contains(@class,\'nested\')]').waitForExist();
    browser.element('//*[contains(@class,\'nested\')]').waitForVisible();
    // const helpCenterUrl = browser.getAttribute('//*[contains(text(),\'Help Center\')]/parent::a', 'href');
    // expect('https://help.appcurator.com/').to.equal(helpCenterUrl);
    const settingsVisibility = browser.isVisible('//*[contains(@class,\'nested\')]');
    // console.log(settingsVisibility + ';;;;;;;;');
    expect(settingsVisibility).to.equal(true);
    browser.element('//*[contains(@class,\'nested\')]').click();
    
  });
  it('Checking general visibility', () => {
    
    browser.element('//*[contains(@href,\'/create\')]').waitForExist();
    browser.element('//*[contains(@href,\'/create\')]').waitForVisible();
    const generalVisibility = browser.isVisible('//*[contains(@href,\'/create\')]');
    // console.log(generalVisibility + ';;;;;;;;');
    expect(generalVisibility).to.equal(true);
    browser.element('//*[contains(@href,\'/create\')]').click();
    browser.pause(5000);
  });
  it('Checking create org', () => {
    
    browser.element('//*[@type=\'text\']').waitForExist();
    browser.element('//*[@type=\'text\']').waitForVisible();
    const generalVisibility = browser.isVisible('//*[@type=\'text\']');
    // console.log(generalVisibility + ';;;;;;;;');
    expect(generalVisibility).to.equal(true);
    browser.element('//*[@type=\'text\']').setValue('test2');
    browser.element('//*[@type=\'submit\']').click();
  
  });
});

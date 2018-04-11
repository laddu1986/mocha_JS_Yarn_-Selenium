import CreateAccountPage from '../specs/createAccountTest';
import HomePage from '../page_objects/homePage';

describe('View Organization setings', () => {
  it('Checking profile visibility', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    const profileVisibility = HomePage.profileMenu.isVisible();
    // console.log(faqVisibility);
    expect(true).to.equal(profileVisibility);
    HomePage.profileMenu.click();
  });

  it('Checking settings visibility', () => {
    HomePage.settingsAnchor.waitForExist();
    HomePage.settingsAnchor.waitForVisible();
    // const helpCenterUrl = browser.getAttribute('//*[contains(text(),\'Help Center\')]/parent::a', 'href');
    // expect('https://help.appcurator.com/').to.equal(helpCenterUrl);
    const settingsVisibility = HomePage.settingsAnchor.isVisible();
    // console.log(settingsVisibility + ';;;;;;;;');
    expect(settingsVisibility).to.equal(true);
    HomePage.settingsAnchor.click();
  });
  
  it('Checking general visibility', () => {
    HomePage.orgSettingsAnchor.waitForExist();
    HomePage.orgSettingsAnchor.waitForVisible();
    const generalVisibility = HomePage.orgSettingsAnchor.isVisible();
    // console.log(generalVisibility + ';;;;;;;;');
    expect(generalVisibility).to.equal(true);
    
  });
});

import CreateAccountPage from '../specs/createAccountTest';
import HomePage from '../page_objects/homePage';

describe('View Organization setings', () => {
  it('Checking profile visibility', () => {
    HomePage.profileMenu.waitForExist();
    HomePage.profileMenu.waitForVisible();
    const profileVisibility = HomePage.profileMenu.isVisible();
    expect(profileVisibility).to.equal(true);
    HomePage.profileMenu.click();
  });

  it('Checking settings visibility', () => {
    HomePage.settingsAnchor.waitForExist();
    HomePage.settingsAnchor.waitForVisible();
    const settingsVisibility = HomePage.settingsAnchor.isVisible();
    expect(settingsVisibility).to.equal(true);
    HomePage.settingsAnchor.click();
  });

  it('Checking general visibility', () => {
    HomePage.orgSettingsAnchor.waitForExist();
    HomePage.orgSettingsAnchor.waitForVisible();
    const generalVisibility = HomePage.orgSettingsAnchor.isVisible();
    expect(generalVisibility).to.equal(true);
  });
});

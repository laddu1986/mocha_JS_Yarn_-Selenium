import * as lib from '../../../common';
import CreateAccountPage from 'web/specs/accounts/createAccountTest';
import HomePage from 'web/page_objects/homePage';

describe('View Organization setings', () => {
  it('Checking profile visibility', () => {
    waitForVisible(HomePage.profileMenu);
    click(HomePage.profileMenu);
  });

  it('Checking settings visibility', () => {
    waitForVisible(HomePage.settingsAnchor);
    click(HomePage.settingsAnchor);
  });

  it('Checking general visibility', () => {
    waitForVisible(HomePage.orgSettingsAnchor);
  });
});

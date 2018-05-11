import CreateAccountPage from '../specs/createAccountTest';
import HomePage from '../page_objects/homePage';
import { openApp, setValue, click, waitForEnabled, waitForElement } from '../actions/actions';

describe('View Organization setings', () => {
  it('Checking profile visibility', () => {
    waitForElement(HomePage.profileMenu);
    click(HomePage.profileMenu);
  });

  it('Checking settings visibility', () => {
    waitForElement(HomePage.settingsAnchor);
    click(HomePage.settingsAnchor);
  });

  it('Checking general visibility', () => {
    waitForElement(HomePage.orgSettingsAnchor);
  });
});

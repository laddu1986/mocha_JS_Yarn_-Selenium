import * as lib from '../../../common';
import CreateAccountPage from 'web/specs/accounts/createAccountTest';
import HomePage from 'web/page_objects/homePage';
import { openApp, setValue, click, waitForElement } from 'web/actions/actions'

describe('View Organization setings', () => {
  it('Checking profile visibility', () => {
    click(HomePage.profileMenu);
  });

  it('Checking settings visibility', () => {
    click(HomePage.settingsAnchor);
  });

  it('Checking general visibility', () => {
    waitForElement(HomePage.orgSettingsAnchor);
  });
});

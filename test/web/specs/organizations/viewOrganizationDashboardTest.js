import * as lib from '../../../common';
import CreateAccountPage from 'web/specs/accounts/createAccountTest';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import { openApp, setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'

describe('Organization Dashboard', () => {
  it('Checking Organization welcome Dashboard message', () => {
    waitForElement(OrgDashboardPage.welcomeMsg);
    const actualHeading = OrgDashboardPage.welcomeMsg.getText();
    const expectedHeading = 'Welcome';
    expect(actualHeading).to.include(expectedHeading);
  });
});

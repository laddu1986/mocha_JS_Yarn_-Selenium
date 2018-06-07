import * as lib from '../../../common';
import CreateAccountPage from 'web/specs/accounts/createAccountTest';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';

describe('Organization Dashboard', () => {
  it('Checking Organization welcome Dashboard message', () => {
    waitForVisible(OrgDashboardPage.welcomeMsg);
    const actualHeading = OrgDashboardPage.welcomeMsg.getText();
    const expectedHeading = 'Welcome';
    expect(actualHeading).to.include(expectedHeading);
  });
});

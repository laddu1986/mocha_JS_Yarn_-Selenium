import CreateAccountPage from '../specs/createAccountTest';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { openApp, setValue, click, waitForEnabled, waitForElement } from '../actions/actions'

describe('Organization Dashboard', () => {
  it('Checking Organization welcome Dashboard message', () => {
    waitForElement(OrgDashboardPage.welcomeMsg);
    const actualHeading = OrgDashboardPage.welcomeMsg.getText();
    const expectedHeading = 'Welcome';
    expect(actualHeading).to.include(expectedHeading);
  });
});

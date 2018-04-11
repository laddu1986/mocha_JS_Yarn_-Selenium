import CreateAccountPage from '../specs/createAccountTest';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
describe('Organization Dashboard', () => {
  it('Checking Organization welcome Dashboard message', () => {
    const actualHeading = OrgDashboardPage.welcomeMsg.getText();
    const expectedHeading = 'Welcome';
    // console.log('actualHeading      ' + actualHeading)
    // console.log('expectedHeading    ' + expectedHeading)
    expect(actualHeading).to.include(expectedHeading);
  });
});

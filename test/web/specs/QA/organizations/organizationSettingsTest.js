import * as lib from '../../../common';
import { signIn, postIdentity, postOrganization, postMembership } from 'actions/common';
import SignInPage from 'page_objects/signInPage';
import {
  verifyOrgCardStack,
  verifyOrgNameOnDashBoard,
  updateOrgName,
  isSaveButtonEnabled,
  gotoOrgSettings,
  selectOrg
} from 'actions/organization';
import { verifySelectedOrgMenu, goToOrgPageFromNavMenu } from 'actions/navBar';
const accountData = new Object();
var org,
  updatedOrgName = `${lib.randomString(10)}_OrgUpdated`;

describe('Update Organization name', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
    await postOrganization(accountData);
    org = accountData.organization;
    await postMembership(accountData);
  });
  before(() => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
  });

  it('C1295707 Verify Settings Page url', () => {
    // Blocked by https://app.clickup.com/t/czw98
    gotoOrgSettings();
    expect(browser.getUrl()).to.include(`/${org}/edit`.toLowerCase(), 'Url contains old orgname'); //This will fail due to https://app.clickup.com/301733/t/84t88
  });

  it('C1640155 Verify Save button is disabled on Settings Page', () => {
    expect(isSaveButtonEnabled()).to.equal(false, 'Save button should be disabled');
  });

  it('C1295708 Update org name --> verify new name appears in url', () => {
    updateOrgName(updatedOrgName);
    expect(browser.getUrl()).to.include(`/${updatedOrgName}/edit`.toLowerCase(), 'New org name does not appear in url'); //This will fail due to https://app.clickup.com/301733/t/84t88
  });

  it('C1640156 Validate left menu bar has the updated org name', () => {
    expect(verifySelectedOrgMenu()).to.include(updatedOrgName, 'The updated org name is not shown on left menu bar');
  });

  it('C1295709 Validate Org dashboard has the updated org name', () => {
    goToOrgPageFromNavMenu();
    verifyOrgNameOnDashBoard(updatedOrgName); //This will fail due to https://app.clickup.com/301733/t/84t88
  });

  it('C1295710 Choose org page has updated Org at top of org cards', () => {
    browser.url(`${browser.options.baseUrl}/organizations`);
    verifyOrgCardStack(updatedOrgName);
  });
});

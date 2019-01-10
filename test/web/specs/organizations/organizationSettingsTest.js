import * as lib from '../../common';
import { createAccount } from 'actions/account';
import accountPage from 'page_objects/accountPage';
import {
  verifyOrgCardStack,
  verifyOrgNameOnDashBoard,
  updateOrgName,
  isSaveButtonEnabled,
  gotoOrgSettings,
  createOrg
} from 'actions/organization';
import { verifySelectedOrgMenu, goToOrgPageFromNavMenu } from 'actions/navBar';
var org1 = `${lib.randomString.generate(10)}_Org1`,
  org2 = `${lib.randomString.generate(10)}_Org2`,
  updatedOrgName = `${lib.randomString.generate(10)}_OrgUpdated`;

describe('Update Organization name', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createOrg(org1);
    createOrg(org2);
  });

  it('Verify Settings Page url', () => {
    gotoOrgSettings();
    expect(browser.getUrl()).to.include(`/${org2}/edit`.toLowerCase(), 'Url contains old orgname'); //This will fail due to https://app.clickup.com/301733/t/84t88
  });

  it('Verify Save button is disabled on Settings Page', () => {
    expect(isSaveButtonEnabled()).to.equal(false, 'Save button should be disabled');
  });

  it('Update org name --> verify new name appears in url', () => {
    updateOrgName(updatedOrgName);
    expect(browser.getUrl()).to.include(`/${updatedOrgName}/edit`.toLowerCase(), 'New org name does not appear in url'); //This will fail due to https://app.clickup.com/301733/t/84t88
  });

  it('Validate left menu bar has the updated org name', () => {
    expect(verifySelectedOrgMenu()).to.include(updatedOrgName, 'The updated org name is not shown on left menu bar');
  });

  it('Validate Org dashboard has the updated org name', () => {
    goToOrgPageFromNavMenu();
    expect(verifyOrgNameOnDashBoard()).to.equal(updatedOrgName, 'The updated org name is not shown on dashboard'); //This will fail due to https://app.clickup.com/301733/t/84t88
  });

  it('Choose org page has updated Org at top of org cards', () => {
    browser.url(`${browser.options.baseUrl}/organizations`);
    verifyOrgCardStack(updatedOrgName);
  });
});

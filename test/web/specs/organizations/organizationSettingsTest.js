import * as lib from '../../common';
import { createAccount } from 'actions/account';
import accountPage from 'page_objects/accountPage';
import {
  verifyOrgCardStack,
  verifyOrgNameOnDashBoard,
  goBackToOrgDashboard,
  verifyNewOrgNameInNavbar,
  updateOrgName,
  isSaveButtonEnabled,
  gotoOrgSettings,
  createOrg
} from 'actions/organization';
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

  it('C1295707 Verify Settings Page', () => {
    gotoOrgSettings();
    expect(browser.getUrl()).to.include(`/${org2}/edit`.toLowerCase());
    expect(isSaveButtonEnabled()).to.equal(false);
  });

  it('C1295708 Update org name --> verify new name appears in navbar and url', () => {
    updateOrgName(updatedOrgName);
    verifyNewOrgNameInNavbar(updatedOrgName);
    expect(browser.getUrl()).to.include(`/${updatedOrgName}/edit`.toLowerCase());
  });

  it('C1295709 Validate Org dashboard has the updated org name', () => {
    goBackToOrgDashboard();
    expect(verifyOrgNameOnDashBoard()).to.equal(updatedOrgName);
  });

  it('C1295710 Choose org page has updated Org at top of org cards', () => {
    browser.url(`${browser.options.baseUrl}/organizations`);
    verifyOrgCardStack(updatedOrgName);
  });
});

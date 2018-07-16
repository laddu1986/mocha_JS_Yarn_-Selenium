import * as lib from '../../../common';
import { createAccount } from 'web/actions/account'
import SignInPage from 'web/page_objects/signInPage';
import { verifyOrgCardStack, verifyOrgNameOnDashBoard, goBackToOrgDashboard, verifyNewOrgNameInNavbar, updateOrgName, isSaveButtonEnabled, gotoOrgSettings, createOrg } from 'web/actions/organization';
var org1 = `${lib.randomString.generate(10)}_Org1`,
  org2 = `${lib.randomString.generate(10)}_Org2`,
  updatedOrgName = `${lib.randomString.generate(10)}_OrgUpdated`;

describe('Update Organization name', () => {
  before(() => {
    SignInPage.open();
    createAccount();
    createOrg(org1);
    createOrg(org2);
  });

  it('Verify Settings Page', () => {
    gotoOrgSettings();
    expect(browser.getUrl()).to.include((`/${org2}/edit`).toLowerCase());
    expect(isSaveButtonEnabled()).to.equal(false);
  });

  it('Update org name --> verify new name appears in navbar and url', () => {
    updateOrgName(updatedOrgName);
    verifyNewOrgNameInNavbar(updatedOrgName);
    expect(browser.getUrl()).to.include((`/${updatedOrgName}/edit`).toLowerCase());
  });

  it('Validate Org dashboard has the updated org name', () => {
    goBackToOrgDashboard();
    expect(verifyOrgNameOnDashBoard()).to.equal(updatedOrgName);
  });

  it('Choose org page has updated Org at top of org cards', () => {
    browser.url(`${process.env.WEB_DEV}/organizations`)
    expect(verifyOrgCardStack()).to.include(updatedOrgName);
  });
});

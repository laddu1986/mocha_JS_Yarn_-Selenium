// Create Organization, sign out, sign back in to validate user lands in the created Org
import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { signOut, signIn } from 'web/actions/common';
import { verifyOrgNameOnDashBoard, goToCreateOrgPageFromNavbar, verifyCreateOrgPage, createNewOrg, verifyWecomeOrgPage } from 'web/actions/organization';
import { getnavOrgCount } from 'web/actions/navBar';
import accountPage from 'web/page_objects/accountPage';
var orgName = lib.randomString.generate(10), accountDetails;

describe(`Tests for Create Organization ${lib.Tags.smokeTest}`, () => {
  before(() => {
    accountPage.open()
    accountDetails = createAccount();
  });

  it('Go to organization creation page', () => {
    goToCreateOrgPageFromNavbar();
    expect(verifyCreateOrgPage()).to.equal(true);
  });

  it('Create new organization', () => {
    createNewOrg(orgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
    expect(browser.getUrl()).to.include(orgName.toLowerCase());
  });

  it('Sign out and back in -->Should show last accessed Org dashboard', () => {
    signOut();
    signIn(accountDetails.email, process.env.ACCOUNT_PASS);
    expect(verifyOrgNameOnDashBoard()).to.equal(orgName);
  });

  it('Checking Org Count in Navbar', () => {
    expect(getnavOrgCount()).to.equal(2);
  })
});

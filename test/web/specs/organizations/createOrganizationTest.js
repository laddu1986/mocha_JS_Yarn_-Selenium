// Create Organization, sign out, sign back in to validate user lands in the created Org
import * as lib from '../../common';
import { createAccount } from 'actions/account';
import { signOut, signIn } from 'actions/common';
import {
  verifyOrgNameOnDashBoard,
  goToCreateOrgPageFromNavbar,
  verifyCreateOrgPage,
  createNewOrg,
  verifyWecomeOrgPage
} from 'actions/organization';
import { getnavOrgCount } from 'actions/navBar';
import accountPage from 'page_objects/accountPage';
var orgName = lib.randomString.generate(10),
  accountDetails;

describe('Tests for Create Organization', () => {
  before(() => {
    accountPage.open();
    accountDetails = createAccount();
  });

  it(`C1295698 Go to organization creation page ${lib.Tags.smokeTest}`, () => {
    goToCreateOrgPageFromNavbar();
    expect(verifyCreateOrgPage()).to.equal(true);
  });

  it(`C1295699 Create new organization ${lib.Tags.smokeTest}`, () => {
    createNewOrg(orgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
    expect(browser.getUrl()).to.include(orgName.toLowerCase());
  });

  it('C1295700 Sign out and back in -->Should show last accessed Org dashboard', () => {
    signOut();
    signIn(accountDetails.email, process.env.ACCOUNT_PASS);
    expect(verifyOrgNameOnDashBoard()).to.equal(orgName);
  });

  it('C1295701 Checking Org Count in Navbar', () => {
    expect(getnavOrgCount()).to.equal(2);
  });
});

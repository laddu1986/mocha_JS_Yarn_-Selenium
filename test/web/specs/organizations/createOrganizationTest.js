// Create Organization, sign out, sign back in to validate user lands in the created Org
import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { signOut, signIn } from 'web/actions/common';
import { verifyOrgNameOnDashBoard, goToCreateOrgPageFromNavbar, verifyCreateOrgPage, createNewOrg, verifyOrgIsCreated } from 'web/actions/organization';
import { getnavOrgCount } from 'web/actions/navBar';
import SignInPage from 'web/page_objects/signInPage';
var orgName = lib.randomString.generate(10), accountDetails;

describe(`Tests for Create Organization ${lib.Tags.smokeTest}`, () => {
  before(() => {
    SignInPage.open();
    accountDetails = createAccount();
  });

  it(`\nGo to organization creation page\n`, () => {
    goToCreateOrgPageFromNavbar();
    expect(verifyCreateOrgPage()).to.equal(true);
  });

  it('Create new organization', () => {
    createNewOrg(orgName);
    expect(verifyOrgIsCreated()).to.equal(true);
    expect(browser.getUrl()).to.include(orgName.toLowerCase());
  });

  it(`\nSign out and back in -->Should show last accessed Org dashboard`, () => {
    signOut();
    signIn(accountDetails.email, 'Pass1234');
    expect(verifyOrgNameOnDashBoard()).to.equal(orgName);
  });

  it(`\n Checking Org Count in Navbar`, () => {
    expect(getnavOrgCount()).to.equal(2);
  })
});

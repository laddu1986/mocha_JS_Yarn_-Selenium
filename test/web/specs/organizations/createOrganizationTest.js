// Create Organization, sign out, sign back in to validate user lands in the created Org
import * as lib from '../../common';
import { signIn, postIdentity, postOrganization, postMembership } from 'actions/common';
import { signOut } from 'actions/navBar';
import {
  verifyOrgNameOnDashBoard,
  goToCreateOrgPageFromNavbar,
  verifyCreateOrgPage,
  createNewOrg,
  verifyWecomeOrgPage,
  selectOrg
} from 'actions/organization';
import { getnavOrgCount } from 'actions/navBar';
import SignInPage from 'page_objects/signInPage';
var orgName = lib.randomString(10);
const accountData = new Object();
describe('Tests for Create Organization', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
  });
  before(() => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
  });
  it(`C1295698 Go to organization creation page ${lib.Tags.smokeTest}`, () => {
    goToCreateOrgPageFromNavbar();
    expect(verifyCreateOrgPage()).to.equal(true);
  });

  it(`C1295699 Create new organization ${lib.Tags.smokeTest}`, () => {
    createNewOrg(orgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
  });

  it('C1640150 Verify the url contains org slug', () => {
    expect(browser.getUrl()).to.include(orgName.toLowerCase());
  });

  it('C1295700 Sign out and back in -->Should show last accessed Org dashboard', () => {
    signOut();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    verifyOrgNameOnDashBoard(orgName);
  });

  it('C1295701 Checking Org Count in Navbar', () => {
    expect(getnavOrgCount()).to.equal(2);
  });
});

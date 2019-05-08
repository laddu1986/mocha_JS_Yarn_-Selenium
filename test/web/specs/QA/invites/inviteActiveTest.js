import '../../../common';
import SignInPage from 'page_objects/signInPage';
import { createAccountToJoinInvitedOrg } from 'actions/account';
import { invitationLink } from 'actions/invite';
import OrgDashboardPage from 'page_objects/orgDashboardPage';
import { submitButtonText } from 'actions/login';
import AccountPage from 'page_objects/accountPage';
import {
  postIdentity,
  postOrganization,
  postMembership,
  postInvitesByOrganizationId,
  getAccessToken
} from 'actions/common';
const accountData = new Object();
var newUser;
var acceptInvitation;
describe(`New User Joins an Organization via ACTIVE invitation`, () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
    await getAccessToken(accountData);
    await postInvitesByOrganizationId(accountData);
    newUser = accountData.inviteEmail;
    acceptInvitation = await invitationLink(newUser);
  });

  before(() => {
    SignInPage.open();
  });

  it('C1295642 New User Accepts Invite and is taken to Join Org page', async () => {
    browser.url(acceptInvitation);
    const expectedMsg = `Join ${accountData.organization}`;
    expect(AccountPage.joinOrgMsg.getText()).to.equal(expectedMsg);
  });

  it('C1640140 Verify the submit button text on join new org page', () => {
    expect(submitButtonText()).to.include('Create account', 'Submit button does not have create account text');
  });

  it('C1295643 User email field is disabled', () => {
    expect(AccountPage.emailInput.isEnabled()).to.equal(false, 'Email field is not disabled');
  });

  it('C1640141 User email field is pre-filled with invited Email', () => {
    expect(AccountPage.emailInput.getValue()).to.equal(newUser, 'Email field is not pre-filled');
  });

  it('C1295644 Completes Account creation and lands on Invited OrgDashboard ', () => {
    createAccountToJoinInvitedOrg();
    expect(OrgDashboardPage.currentOrgName.getText()).to.equal(accountData.organization);
  });
});

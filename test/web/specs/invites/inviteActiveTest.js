/*
TEST CASE - 
Admin invites new User
User gets invite mail 
Clicks on Accept Invite button
Redirected to Create Account page
User lands in invited Org after account creation
*/
import * as lib from '../../common';
import { createAccountToJoinInvitedOrg, createAccount } from 'actions/account';
import { inviteTeammate, invitationLink } from 'actions/invite';
import { signOut } from 'actions/common';
import OrgDashboardPage from 'page_objects/orgDashboardPage';
import { submitButtonText } from 'actions/login';
import AccountPage from 'page_objects/accountPage';

let newUser, accountData;

describe(`New User Joins an Organization via ACTIVE invitation`, () => {
  before('Admin Invites Teammate', () => {
    AccountPage.open();
    accountData = createAccount();
    browser.pause(1000);
    newUser = `newUser_${lib.randomString.generate(4)}@test.co`;
    inviteTeammate(newUser, '1');
    signOut();
  });

  it('C1295641 Click on the Invitation Link', async () => {
    const acceptInvitation = await invitationLink(newUser);
    browser.url(acceptInvitation); //replication for user clicking on Accept Invitation button in email
  });

  it('C1295642 New User Accepts Invite and is taken to Join Org page', async () => {
    const expectedMsg = `Join ${accountData.organization}`;
    expect(AccountPage.joinOrgMsg.getText()).to.equal(expectedMsg);
    expect(submitButtonText()).to.include('Create Account');
  });

  it("C1295643 User's email field is disabled and pre-filled with invited Email", () => {
    expect(AccountPage.emailInput.isEnabled()).to.equal(false);
    expect(AccountPage.emailInput.getValue()).to.equal(newUser);
  });

  it('C1295644 Completes Account creation and lands on Invited OrgDashboard ', () => {
    createAccountToJoinInvitedOrg();
    expect(OrgDashboardPage.currentOrgName.getText()).to.equal(accountData.organization);
  });
});

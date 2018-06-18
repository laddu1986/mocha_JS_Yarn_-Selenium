/*
TEST CASE - 
Admin invites new User
User gets invite mail 
Clicks on Accept Invite button
Redirected to Create Account page
User lands in invited Org after account creation
*/
import * as lib from '../../../common';
import { createAccountToJoinInvitedOrg, createAccount } from 'web/actions/account';
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink } from 'web/actions/invite';
import SignInPage from 'web/page_objects/signInPage'
import { getNotificationMessageText, signIn, signOut } from 'web/actions/common'
import AccountPage from '../../page_objects/AccountPage';
import OrgDashboardPage from '../../page_objects/orgDashboardPage';
import { submitButtonText } from 'web/actions/login';
import passiveNotification from '../../data/passiveNotification.json'

let newUser, accountData;

describe('New User Joins an Organization via ACTIVE invitation', () => {
  before('Admin Invites Teammate', () => {
    SignInPage.open();
    accountData = createAccount()
    browser.pause(1000)
    newUser = `newUser_${lib.randomString.generate(4)}@test.co`;
    inviteTeammate(newUser, '1')
    signOut()
  });

  it("Click on the Invitation Link", async () => {
    const acceptInvitation = await invitationLink(newUser)
    browser.url(acceptInvitation)  //replication for user clicking on Accept Invitation button in email
  });

  it('New User Accepts Invite and is taken to Join Org page', async () => {
    const expectedMsg = `Join ${accountData.organization}`
    expect(AccountPage.joinOrgMsg.getText()).to.equal(expectedMsg)
    expect(submitButtonText()).to.include('Create Account')
  })

  it('User\'s email field is disabled and pre-filled with invited Email', () => {
    expect(AccountPage.emailInput.isEnabled()).to.equal(false)
    expect(AccountPage.emailInput.getValue()).to.equal(newUser)
  });

  it('Completes Account creation and lands on Invited OrgDashboard ', () => {
    createAccountToJoinInvitedOrg()
    expect(OrgDashboardPage.currentOrgName.getText()).to.equal(accountData.organization)
  });
});
/*
TEST CASE - 
Admin invites new User
User gets invite mail 
Clicks on Accept Invite button
Redirected to Create Account page
User lands in invited Org after account creation
*/
import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink } from 'web/actions/invite';
import SignInPage from 'web/page_objects/signInPage'
import { signIn, signOut } from 'web/actions/common'
import AccountPage from '../../page_objects/AccountPage';
import Common from '../../page_objects/common'
import OrgDashboardPage from '../../page_objects/orgDashboardPage';
import passiveNotification from '../../data/passiveNotification.json'

let newUser, accountData;

describe('New User Joins an Organization via ACTIVE invitation', () => {

  before('Admin Invites Teammate', () => {
    SignInPage.open();
    accountData = createAccount()
    browser.pause(2000)
    newUser = `newUser_${lib.randomString.generate(4)}@test.co`;
    inviteTeammate(newUser, '1')
    expect(Common.successMsg.getText()).to.include(passiveNotification.invitationSentMessage.text)
    signOut()
  });

  it("Click on the Invitation Link", async () => {
    const acceptInvitation = await invitationLink(newUser)
    browser.url(acceptInvitation)  //replication for user clicking on Accept Invitation button in email
  });

  it('New User Accepts Invite and is taken to Join Org page', async () => {
    const expectedMsg = `Join ${accountData.organization}`
    expect(AccountPage.joinOrgMsg.getText()).to.equal(expectedMsg)
    expect(Common.submitButton.getText()).to.include('Create Account')
  })

  it('User\'s email field is disabled and pre-filled with invited Email', () => {
    expect(AccountPage.emailInput.isEnabled()).to.equal(false)
    expect(AccountPage.emailInput.getValue()).to.equal(newUser)
  });

  it('Completes Account creation and lands on Invited OrgDashboard ', () => {
    createAccountToJoinInvitedOrg()
    expect(OrgDashboardPage.currentOrgName.getText()).to.equal(accountData.organization)
  });

  function createAccountToJoinInvitedOrg() {
    AccountPage.nameInput.setValue(`newUser_${accountData.name}`)
    AccountPage.passwordInput.setValue(accountData.password)
    Common.submitButton.click()
    OrgDashboardPage.currentOrgName.waitForVisible();
  }

});

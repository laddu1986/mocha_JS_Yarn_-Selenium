/*
TEST CASE - 
Admin invites new User
User gets invite mail 
Clicks on Accept Invite button
Redirected to Create Account page
User lands in invited Org after account creation
*/
import * as lib from '../../../common';
import { createAccount, organization, email, name, password } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink } from 'web/actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import { signIn, signOut } from 'web/actions/common'
import createAccountPage from '../../page_objects/createAccountPage';
import common from '../../page_objects/common'
import { waitForElement, setValue, click } from '../../actions/actions'
import orgDashboardPage from '../../page_objects/orgDashboardPage';
import passiveNotification from '../../data/passiveNotification.json'

let newUser;

describe('New User Joins an Organization via ACTIVE invitation', () => {

  // before("Admin invites a Non Existing user", () => {
  before('Admin Invites Teammate', () => {
    SignInPage.open();
    createAccount()
    console.log('ADMIN  ', email)
    newUser = `newUser_${email}`;
    console.log('newUser', newUser)
    inviteTeammate(newUser, '1')
    expect(common.successMsg.getText()).to.include(passiveNotification.invitationSentMessage.text)
    signOut()
  });

  it("Click on the Invitation Link", async () => {
    const acceptInvitation = await invitationLink(newUser)
    browser.url(acceptInvitation)  //replication for user clicking on Accept Invitation button in email
  });

  it('New User Accepts Invite and is taken to Join Org page', async () => {
    const expectedMsg = `Join ${organization}`
    expect(createAccountPage.joinOrgMsg.getText()).to.equal(expectedMsg)
    expect(common.submitButton.getText()).to.include('Create Account')
  })

  it('User\'s email field is disabled and pre-filled with invited Email', () => {
    expect(createAccountPage.emailInput.isEnabled()).to.equal(false)
    expect(createAccountPage.emailInput.getValue()).to.equal(newUser)
  });

  it('Completes Account creation and lands on Invited OrgDashboard ', () => {
    createAccountToJoinInvitedOrg()
    expect(orgDashboardPage.currentOrgName.getText()).to.equal(organization)
  });

  function createAccountToJoinInvitedOrg() {
    setValue(createAccountPage.nameInput, `newUser_${name}`)
    setValue(createAccountPage.passwordInput, password)
    click(common.submitButton)
    waitForElement(orgDashboardPage.currentOrgName)
  }

  after("end SQL connection", () => {
    //lib.end()
  })

});


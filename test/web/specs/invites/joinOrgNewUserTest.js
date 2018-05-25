/*
TEST CASE - 
Admin invites new User
User gets invite mail 
Clicks on Accept Invite button
Redirected to Create Account page
User lands in invited Org after account creation
*/
import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
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

  before(() => {
    SignInPage.open();
    createAccount()
  });

  it('Admin invites a Non Existing user and verifies passive notification', () => {
    newUser = `newUser_${lib.testData.email}`;
    inviteTeammate(newUser, '1')
    expect(common.successMsg.getText()).to.include(passiveNotification.invitationSentMessage.text)

  });

  it('Admin Signs Out', () => {
    signOut()
  });

  it('User clicks on the Invite link', async () => {
    const acceptInvitation = await invitationLink(newUser)
    browser.url(acceptInvitation)  //replication for user clicking on Accept Invitation button in email
  })

  it('User redirected to Join Org page with Create Account button ', () => {
    const joinOrgMsg = createAccountPage.joinOrgMsg.getText()
    const expectedMsg = `Join ${lib.testData.organization}`

    expect(joinOrgMsg).to.equal(expectedMsg)
    waitForElement(common.submitButton)
    expect(common.submitButton.getText()).to.include('Create Account')
  });

  it('User\'s email field is disabled and pre-filled with invited Email', () => {
    expect(createAccountPage.emailInput.isEnabled()).to.equal(false)
    expect(createAccountPage.emailInput.getValue()).to.equal(newUser)
  });

  it('User completes Account creation by filling other details ', () => {
    setValue(createAccountPage.nameInput, `newUser_${lib.testData.name}`)
    setValue(createAccountPage.passwordInput, lib.testData.password)
    click(common.submitButton)
  });

  it('User lands on invited Org page', () => {
    waitForElement(orgDashboardPage.currentOrgName)
    expect(orgDashboardPage.currentOrgName.getText()).to.equal(lib.testData.organization)
  });
});
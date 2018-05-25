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
let newUser;

describe('New User Joins an Organization via ACTIVE invitation', () => {

  before(() => {
    SignInPage.open();
    createAccount()
    console.log(lib.testData.email + `\n` + lib.testData.password + `\n` + lib.testData.organization)
  });

  it('Admin invites a Non Existing user', () => {
    newUser = `newUser_${lib.testData.email}`;
    inviteTeammate(newUser, '1')
  });

  it('Admin Signs Out', () => {
    signOut()
  });

  it('User clicks on the Invite link', async () => {
    console.log('New user Email :   ', newUser)
    const acceptInvitation = await invitationLink(newUser)

    console.log('url', acceptInvitation)
    browser.url(acceptInvitation)  //replication for user clicking on Accept Invitation button in email
  })

  it('User redirected to Join Org page with Create Account button ', () => {
    const joinOrgMsg = createAccountPage.joinOrgMsg.getText()
    const expectedMsg = `Join ${lib.testData.organization}`

    expect(joinOrgMsg).to.equal(expectedMsg)
    waitForElement(common.submitButton)
    expect(common.submitButton.getText()).to.include('Create Account')
  });

  it('User\'s email field is disabled and pre-filled with his Email', () => {
    expect(createAccountPage.emailInput.isEnabled()).to.equal(false)
    expect(createAccountPage.emailInput.getValue()).to.equal(newUser)
  });

  it('User\'s email field is pre-filled with his Email', () => {
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
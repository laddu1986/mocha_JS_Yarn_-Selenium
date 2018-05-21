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
import navBar from '../../page_objects/navBar';
import teamPage from '../../page_objects/teamPage';
let newMember;


describe('Join an Organization via REVOKED invitation email (New Account)', () => {

  before(() => {
    SignInPage.open();
    createAccount()
    // browser.pause(2000)

    console.log(lib.testData.email + `\n` + lib.testData.password + `\n` + lib.testData.organization)
    signOut()
    // browser.pause(2000)
    signIn(lib.testData.email, lib.testData.password)
    // browser.pause(2000)

  });

  it('Invite a Non Existing member', () => {
    newMember = `newmember_${lib.testData.email}`;
    // browser.pause(2000)

    inviteTeammate(newMember, '1')
    // browser.pause(2000)

  });

  it('Go to Teammates page and revoke Invitation', () => {
    goToTeammatesPage()
    click(teamPage.inactiveTab)
    



  });

  it('Sign Out', () => {
    signOut()
    // browser.pause(2000)

  });

  it('New Member clicks on the Invite link', async () => {
    console.log('New member Email :   ', newMember)
    const acceptInvitation = await invitationLink(newMember)

    console.log('url', acceptInvitation)
    browser.url(acceptInvitation)
  })

  it('Validate redirection to Join Org page with Create Account button ', () => {
    const joinOrgMsg = createAccountPage.joinOrgMsg.getText()
    const expectedMsg = `Join ${lib.testData.organization}`

    expect(joinOrgMsg).to.equal(expectedMsg)
    waitForElement(common.submitButton)
    expect(common.submitButton.getText()).to.include('Create Account')
  });

  it('Validate email field is disabled', () => {
    expect(createAccountPage.emailInput.isEnabled()).to.equal(false)
  });

  it('Validate email field is pre-filled with new member Email', () => {
    expect(createAccountPage.emailInput.getValue()).to.equal(newMember)
  });

  it('Complete Account creation by filling other details ', () => {
    setValue(createAccountPage.nameInput, `newMember_${lib.testData.name}`)
    setValue(createAccountPage.passwordInput, lib.testData.password)
    click(common.submitButton)
  });

  it('Validate User lands in invited Org', () => {
    waitForElement(orgDashboardPage.currentOrgName)
    expect(orgDashboardPage.currentOrgName.getText()).to.equal(lib.testData.organization)
  });
});


import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink, revokeInvite, updateTokenExpiryDateInDB, goToInactiveTab } from 'web/actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import CommonPage from '../../page_objects/common';
import createAccountPage from '../../page_objects/createAccountPage';
import common from '../../page_objects/common'
import { getNotificationMessageText, closePassiveNotification, signOut, signIn } from 'web/actions/common'
import { waitForElement, setValue, click } from '../../actions/actions'
import orgDashboardPage from '../../page_objects/orgDashboardPage';
import navBar from '../../page_objects/navBar';
import teamPage from '../../page_objects/teamPage';
import message from '../../data/messages.json'

let newMember;
let invitationURL;


describe('Access an Expired Invitation (New Account)', () => {

  before(() => {
    SignInPage.open();
    createAccount()
    console.log(lib.testData.email + `\n` + lib.testData.password + `\n` + lib.testData.organization)
  });

  it('Invite a Non Existing member', () => {
    newMember = `newmember_${lib.testData.email}`;
    inviteTeammate(newMember, '1')
  });

  it('Get Invitation URL', async () => {
    invitationURL = await invitationLink(newMember)
    console.log('url', invitationURL)
  });

  it('Expire invite token manually from Database', async () => {
    await updateTokenExpiryDateInDB(newMember) //update ExpiryDate of token to a history date in db
  });

  it('Go to Inactive tab of Teammates page', () => {
    goToTeammatesPage()
    goToInactiveTab()
  });

  it('Verify status as Expired', () => {
    console.log('teamPage.inactiveRowStatus.getText()   ', teamPage.inactiveRowStatus.getText())
    expect(teamPage.inactiveRowStatus.getText()).to.deep.equal('Expired')
  });

  it('Sign Out', () => {
    signOut()
  });

  it('New Member clicks on the Invite link', () => {
    console.log('New member Email :   ', newMember)
    browser.url(invitationURL) //this is a replication of user clicking on Accept Invitation button from invite email
  })

  it('Validate user lands on Expired invitation page', () => {
    expect(common.expiredInvitationMsg.getText()).to.include(message.expiredInvitation)
  });
});


import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink, revokeInvite } from 'web/actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import CommonPage from '../../page_objects/common';
import createAccountPage from '../../page_objects/createAccountPage';
import common from '../../page_objects/common'
import { getNotificationMessageText, closePassiveNotification, signOut, signIn } from 'web/actions/common'
import { waitForElement, setValue, click } from '../../actions/actions'
import orgDashboardPage from '../../page_objects/orgDashboardPage';
import navBar from '../../page_objects/navBar';
import teamPage from '../../page_objects/teamPage';
import revokeNotif from '../../data/passiveNotification.json'
let newMember;
let invitationURL;


describe('Access a Revoked Invitation (New Account)', () => {

  before(() => {
    SignInPage.open();
    createAccount()
    console.log(lib.testData.email + `\n` + lib.testData.password + `\n` + lib.testData.organization)
  });

  it('Invite a Non Existing member', () => {
    newMember = `newmember_${lib.testData.email}`;
    inviteTeammate(newMember, '1')
  });

  it('Go to Inactive tab of Teammates page', () => {
    goToTeammatesPage()
    click(teamPage.inactiveTab)
  });
  it('Get Invitation URL', async () => {
    invitationURL = await invitationLink(newMember)
    console.log('url', invitationURL)
  });

  it('Revoke Invite and validate Passive Notification', () => {
    revokeInvite()
    expect(getNotificationMessageText()).to.include(revokeNotif.revokeInviteMessage.text)
  });

  it('Sign Out', () => {
    signOut()
  });

  it('New Member clicks on the Invite link', () => {
    console.log('New member Email :   ', newMember)
    browser.url(invitationURL) //user clicks on Accept Invitation button from invite email
  })

  it('Verify user lands on Invalid invitation page', () => {
    expect(common.invalidInvitationMsg.getText()).to.include('Invalid invitation')
  });
});


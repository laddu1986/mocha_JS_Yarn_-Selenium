import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink, revokeInvite, goToInactiveTab } from 'web/actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import CommonPage from '../../page_objects/common';
import createAccountPage from '../../page_objects/createAccountPage';
import common from '../../page_objects/common'
import { getNotificationMessageText, closePassiveNotification, signOut, signIn } from 'web/actions/common'
import { waitForElement, setValue, click } from '../../actions/actions'
import orgDashboardPage from '../../page_objects/orgDashboardPage';
import navBar from '../../page_objects/navBar';
import teamPage from '../../page_objects/teamPage';
import passiveNotification from '../../data/passiveNotification.json'
let newMember;
let invitationURL;

describe('Access a Revoked Invitation (New Account)', () => {

  before(() => {
    SignInPage.open();
    createAccount()
  });

  it('Invite a Non Existing member', () => {
    newMember = `newmember_${lib.randomString.generate(8)}@test.com`;
    inviteTeammate(newMember, '1')
  });

  it('Get Invitation URL', async () => {
    invitationURL = await invitationLink(newMember)
  });

  it('Revoke Invite and validate Passive Notification', () => {
    goToTeammatesPage()
    goToInactiveTab()
    revokeInvite()
    expect(getNotificationMessageText()).to.include(passiveNotification.revokeInviteMessage.text)
  });

  it('Sign Out', () => {
    signOut()
  });

  it('New Member clicks on the Invite link', () => {
    browser.url(invitationURL) //user clicks on Accept Invitation button from invite email
  })

  it('Verify user lands on Invalid invitation page', () => {
    expect(common.invalidInvitationMsg.getText()).to.include('Invalid invitation')
  });
});


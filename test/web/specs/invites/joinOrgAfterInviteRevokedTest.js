import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { goToTeammatesPage, inviteTeammate, invitationLink, revokeInvite, goToInactiveTab } from 'web/actions/invite';
import { getNotificationMessageText, signOut } from 'web/actions/common'
import passiveNotification from '../../data/passiveNotification.json'
import SignInPage from 'web/page_objects/signInPage'
import common from 'web/page_objects/common'
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


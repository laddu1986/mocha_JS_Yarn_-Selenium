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
    browser.pause(2000)
    newMember = `newmember_${lib.randomString.generate(5)}@test.co`;
    inviteTeammate(newMember, '1')
    expect(getNotificationMessageText()).to.include(passiveNotification.invitationSentMessage.text)
  });

  it('New User gets Invitation URL', async () => {
    invitationURL = await invitationLink(newMember)
  });

  it('Admin revokes invite and validates Passive Notification and Sign Out', () => {
    goToTeammatesPage()
    goToInactiveTab()
    revokeInvite()
    expect(getNotificationMessageText()).to.include(passiveNotification.revokeInviteMessage.text)
    signOut()
  });

  it('New User clicks on the Invite link --> Lands on Invalid invitation page', () => {
    browser.url(invitationURL) //user clicks on Accept Invitation button from invite email
    expect(common.invalidInvitationMsg.getText()).to.include('Invalid invitation')
  })

});
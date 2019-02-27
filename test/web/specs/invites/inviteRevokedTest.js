import * as lib from '../../common';
import { createAccount } from 'actions/account';
import {
  invalidInvitationText,
  goToTeammatesPage,
  inviteTeammate,
  invitationLink,
  revokeInvite,
  goToInactiveTab
} from 'actions/invite';
import { getNotificationMessageText } from 'actions/common';
import { signOut } from 'actions/navBar';
import passiveNotification from 'data/passiveNotification.json';
import messagesData from 'data/messages.json';
import accountPage from 'page_objects/accountPage';
let newMember;
let invitationURL;

describe('Access a Revoked Invitation (New Account)', () => {
  before(() => {
    accountPage.open();
    createAccount();
    browser.pause(1000);
    newMember = `newmember_${lib.randomString.generate(5)}@test.co`;
    inviteTeammate(newMember, '1');
  });

  it('C1748466 New User gets Invitation URL', async () => {
    invitationURL = await invitationLink(newMember);
  });

  it('C1295653 Admin revokes invite and validates Passive Notification and Sign Out', () => {
    goToTeammatesPage();
    goToInactiveTab();
    revokeInvite();
    expect(getNotificationMessageText()).to.include(passiveNotification.revokeInviteMessage.text);
  });

  it('C1295654 New User clicks on the Invite link --> Lands on Invalid invitation page', () => {
    signOut();
    browser.url(invitationURL); //user clicks on Accept Invitation button from invite email
    expect(invalidInvitationText()).to.include(messagesData.invite.invalidInvitation);
  });
});

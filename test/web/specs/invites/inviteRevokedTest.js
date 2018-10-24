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
import { getNotificationMessageText, signOut } from 'actions/common';
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

  it('New User gets Invitation URL', async () => {
    invitationURL = await invitationLink(newMember);
  });

  it('Admin revokes invite and validates Passive Notification and Sign Out', () => {
    goToTeammatesPage();
    goToInactiveTab();
    revokeInvite();
    expect(getNotificationMessageText()).to.include(passiveNotification.revokeInviteMessage.text);
    signOut();
  });

  it('New User clicks on the Invite link --> Lands on Invalid invitation page', () => {
    browser.url(invitationURL); //user clicks on Accept Invitation button from invite email
    expect(invalidInvitationText()).to.include(messagesData.invite.invalidInvitation);
  });
});

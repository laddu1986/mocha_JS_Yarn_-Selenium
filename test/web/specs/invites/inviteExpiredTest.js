/*
TestCase: New User
  Invitation Expires
  User Lands on Expired Invitation page
  Admin Resends Expired invite
  User accepts and lands on Join Org page
*/
import * as lib from '../../common';
import { createAccount, joinOrgText } from 'actions/account';
import { submitButtonVisible } from 'actions/login';
import { inviteStatus } from 'actions/invite';
import {
  expiredInvitationText,
  goToTeammatesPage,
  inviteTeammate,
  invitationLink,
  updateTokenExpiryDateInDB,
  goToInactiveTab,
  resendInvite
} from 'actions/invite';
import { getNotificationMessageText, signOut, signIn } from 'actions/common';
import accountPage from 'page_objects/accountPage';
import SignInPage from 'page_objects/signInPage';
import message from 'data/messages.json';
import passiveNotification from 'data/passiveNotification.json';
import constants from 'constants.json';
let newUser, invitationURL, accountData;

describe('New User accesses an Expired Invitation', () => {
  before(() => {
    accountPage.open();
    accountData = createAccount();
    browser.pause(1000);
  });

  it('Admin invites a New User', () => {
    newUser = `newUser_${lib.randomString.generate(4)}@test.co`;
    inviteTeammate(newUser, '1');
  });

  it('Invitation Expires', async () => {
    invitationURL = await invitationLink(newUser);
    await updateTokenExpiryDateInDB(newUser); //update ExpiryDate of token to a history date in db
  });

  it('Inactive tab status --> shows as Expired', () => {
    browser.refresh(); //refresh to reflect the latest expired/pending status from DB
    goToTeammatesPage();
    goToInactiveTab();
    expect(inviteStatus()).to.deep.equal(constants.InviteStatus.Expired);
    signOut();
    browser.pause(1000);
  });

  it('Clicking Invite link  -->  Redirects to Expired invitation page', () => {
    browser.url(invitationURL); //this is a replication of user clicking on Accept Invitation button from invite email
    expect(expiredInvitationText()).to.include(message.invite.expiredInvitation);
  });

  it('Admin logs in and goes to inactive invite tab', () => {
    SignInPage.open();
    signIn(accountData.email, accountData.password);
    browser.pause(1500); // workaround for Bug: ACT-299. will be removed after bugfix
    goToTeammatesPage();
    goToInactiveTab();
  });

  it('Resends Expired Invitation --> validate Passive Notification', () => {
    resendInvite();
    const expectedPassiveNotificationMessage = `${passiveNotification.resendInviteMessage.text}${newUser}`;
    expect(getNotificationMessageText()).to.include(expectedPassiveNotificationMessage);
    signOut();
  });

  it('User gets new Invitation eMail and Accepts Invite', async () => {
    invitationURL = await invitationLink(newUser);
    browser.url(invitationURL);
  });

  it('User lands on Create Account and Join org page', () => {
    expect(joinOrgText()).to.include(accountData.organization);
    expect(submitButtonVisible()).to.equal(true);
  });
});

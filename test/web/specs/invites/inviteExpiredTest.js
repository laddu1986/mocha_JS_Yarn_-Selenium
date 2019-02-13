/*
TestCase: New User
  Invitation Expires
  User Lands on Expired Invitation page
  Admin Resends Expired invite
  User accepts and lands on Join Org page
*/
import * as lib from '../../common';
import { createAccount, verifyJoinOrgText } from 'actions/account';
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

  it('C1295645 Admin invites a New User', () => {
    newUser = `newUser_${lib.randomString(4)}@test.co`;
    inviteTeammate(newUser, '1');
  });

  it('C1295646 Invitation Expires', async () => {
    invitationURL = await invitationLink(newUser);
    await updateTokenExpiryDateInDB(newUser); //update ExpiryDate of token to a history date in db
  });

  it('C1295647 Inactive tab status --> shows as Expired', () => {
    browser.refresh(); //refresh to reflect the latest expired/pending status from DB
    goToTeammatesPage();
    goToInactiveTab();
    expect(inviteStatus()).to.deep.equal(constants.InviteStatus.Expired);
  });

  it('C1295648 Clicking Invite link  -->  Redirects to Expired invitation page', () => {
    signOut();
    browser.pause(1000);
    browser.url(invitationURL); //this is a replication of user clicking on Accept Invitation button from invite email
    expect(expiredInvitationText()).to.include(message.invite.expiredInvitation);
  });

  it('C1640142 Admin logs in and goes to inactive invite tab', () => {
    SignInPage.open();
    signIn(accountData.email, accountData.password);
    browser.pause(1500); // workaround for Bug: ACT-299. will be removed after bugfix
    goToTeammatesPage();
    goToInactiveTab();
    expect(inviteStatus()).to.deep.equal(constants.InviteStatus.Expired);
  });

  it('C1295649 Resends Expired Invitation --> validate Passive Notification', () => {
    resendInvite();
    let expectedPassiveNotificationMessage = `${passiveNotification.resendInviteMessage.text}${newUser}`;
    expect(getNotificationMessageText()).to.include(expectedPassiveNotificationMessage);
  });

  it('C1295650 User gets new Invitation eMail and Accepts Invite', async () => {
    signOut();
    invitationURL = await invitationLink(newUser);
    browser.url(invitationURL);
  });

  it('C1295651 lands on Create Account and Join Org page', () => {
    verifyJoinOrgText(accountData.organization);
  });

  it('C1640143 Submit button is visible for creating account to join org', () => {
    expect(submitButtonVisible()).to.equal(true);
  });
});

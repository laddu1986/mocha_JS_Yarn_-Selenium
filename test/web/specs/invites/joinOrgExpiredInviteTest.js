/*
TestCase: New User
  Invitation Expires
  User Lands on Expired Invitation page
  Admin Resends Expired invite
  User accepts and lands on Join Org page
*/
import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { goToTeammatesPage, inviteTeammate, invitationLink, updateTokenExpiryDateInDB, goToInactiveTab, resendInvite, } from 'web/actions/invite';
import SignInPage from 'web/page_objects/signInPage'
import CommonPage from '../../page_objects/common';
import accountPage from '../../page_objects/accountPage';
import { getNotificationMessageText, closePassiveNotification, signOut, signIn } from 'web/actions/common'
import teamPage from '../../page_objects/teamPage';
import message from '../../data/messages.json'
import passiveNotification from '../../data/passiveNotification.json'

let newUser, invitationURL, accountData;


describe('New User accesses an Expired Invitation', () => {

  before(() => {
    SignInPage.open();
    accountData = createAccount()
  });

  it('Admin invites a New User', () => {
    newUser = `newUser_${lib.randomString.generate(7)}@test.co`;
    inviteTeammate(newUser, '1')
  });

  it('User gets Invitation URL', async () => {
    invitationURL = await invitationLink(newUser)
  });

  it('Expire invite token manually from Database', async () => {
    await updateTokenExpiryDateInDB(newUser) //update ExpiryDate of token to a history date in db
  });

  it('Admin goes to Inactive tab of Teammates page', () => {
    goToTeammatesPage()
    browser.refresh();
    goToInactiveTab()
  });

  it('Admin verifies status as Expired', () => {
    expect(teamPage.inactiveRowStatus.getText()).to.deep.equal('Expired')
  });

  it('Admin Signs Out', () => {
    signOut()
  });

  it('User clicks on the Invite link', () => {
    browser.url(invitationURL) //this is a replication of user clicking on Accept Invitation button from invite email
  })

  it('User lands on Expired invitation page', () => {
    expect(CommonPage.expiredInvitationMsg.getText()).to.include(message.expiredInvitation)
  });
});

describe('Admin Re-sends an Expired Invitation', () => {
  it('Admin logs in', () => {
    SignInPage.open()
    signIn(accountData.email, 'Pass1234')
  });

  it('Admin goes to Inactive tab of Teammates page', () => {
    browser.pause(1500) // pause workaround for Bug: ACT-299. will be removed after bugfix
    goToTeammatesPage()
    goToInactiveTab()
  });

  it('Admin Resends Expired Invitation and validate Passive Notification', () => {
    resendInvite()
    const expectedPassiveNotificationMessage = `${passiveNotification.resendInviteMessage.text}${newUser}`
    expect(CommonPage.successMsg.getText()).to.include(expectedPassiveNotificationMessage)
  });

  it('Admin Sign Out', () => {
    signOut()
  });
});

describe('New User Accepts new Invite', () => {
  it('User gets new Invitation eMail and Accepts Invite', async () => {
    invitationURL = await invitationLink(newUser)
    browser.url(invitationURL)
  });
  it('User lands on Create Account and Join org page', () => {
    expect(accountPage.joinOrgMsg.getText()).to.include(accountData.organization)
    expect(CommonPage.submitButton.isVisible()).to.equal(true)
  });
});
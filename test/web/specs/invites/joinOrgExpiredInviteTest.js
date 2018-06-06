/*
TestCase: New User
  Invitation Expires
  User Lands on Expired Invitation page
  Admin Resends Expired invite
  User accepts and lands on Join Org page
*/
import * as lib from '../../../common';
<<<<<<< HEAD
import { createAccount, organization, name, email, password } from 'web/actions/createAccount';
=======
import { createAccount } from 'web/actions/account';
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595
import {
  sendInviteButtonEnabled,
  sendInvite, verifyInviteCount,
  clickInviteTeammateButton,
  goToTeammatesPage, verifyInvite,
  goToOrganisationDashboard,
  inviteTeammate,
  invitationLink,
  revokeInvite,
  updateTokenExpiryDateInDB,
  goToInactiveTab,
  resendInvite,
<<<<<<< HEAD
} from '../../actions/inviteTeammate';
=======
} from 'web/actions/invite';
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595
import SignInPage from 'web/page_objects/signInPage'
import CommonPage from '../../page_objects/common';
import createAccountPage from '../../page_objects/createAccountPage';
import common from '../../page_objects/common'
import { getNotificationMessageText, signOut, signIn } from 'web/actions/common'
import { waitForElement, setValue, click } from '../../actions/actions'
import orgDashboardPage from '../../page_objects/orgDashboardPage';
import navBar from '../../page_objects/navBar';
import teamPage from '../../page_objects/teamPage';
import message from '../../data/messages.json'
import passiveNotification from '../../data/passiveNotification.json'

let newUser;
let invitationURL;
//let adminEmail

describe('New User accesses an Expired Invitation', () => {

  before(() => {
    SignInPage.open();
    createAccount()
    console.log(email)
  });

  it('Admin invites a New User', () => {
    newUser = `newUser_${email}`;
    console.log(newUser)
    // browser.pause(8000)
    inviteTeammate(newUser, '1')
    expect(CommonPage.successMsg.getText().to.include(passiveNotification.invitationSentMessage.text))
  });

  it('User gets Invitation URL', async () => {
    invitationURL = await invitationLink(newUser)
  });

  it('Expire invite token manually from Database', async () => {
    await updateTokenExpiryDateInDB(newUser) //update ExpiryDate of token to a history date in db
  });

  it('Admin goes to Inactive tab of Teammates page', () => {
    browser.refresh()
    goToTeammatesPage()
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
    expect(common.expiredInvitationMsg.getText()).to.include(message.expiredInvitation)
  });
});

describe('Admin Re-sends an Expired Invitation', () => {
  it('Admin logs in', () => {
    SignInPage.open()
    signIn(email, password)
  });

  it('Admin goes to Inactive tab of Teammates page', () => {
    browser.pause(1500) // workaround for Bug: ACT-299. will be removed after bugfix
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
    expect(createAccountPage.joinOrgMsg.getText()).to.include(`Join ${organization}`)
    expect(CommonPage.submitButton.isVisible()).to.equal(true)
  });
});
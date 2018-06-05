import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink, revokeInvite, goToInactiveTab } from '../../actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import CommonPage from '../../page_objects/common';
import createAccountPage from '../../page_objects/createAccountPage';
import common from '../../page_objects/common'
import { getNotificationMessageText, signOut, signIn } from '../../actions/common'
import { waitForElement, setValue, click } from '../../actions/actions'
import orgDashboardPage from '../../page_objects/orgDashboardPage';
import navBar from '../../page_objects/navBar';
import teamPage from '../../page_objects/teamPage';
import passiveNotification from '../../data/passiveNotification.json'
import { email, organization } from '../../actions/createAccount';
import OrgDashboardPage from '../../page_objects/orgDashboardPage'
let newMember;
let invitationURL;

describe('Access a Revoked Invitation (New Account)', () => {

  before('Admin Invites New User', () => {
    SignInPage.open();
    createAccount()
    console.log(email, '---- ', organization)
    newMember = `newmember_${email}`;
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
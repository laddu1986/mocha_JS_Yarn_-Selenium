import '../../../common';
import { verifyJoinOrgText } from 'actions/account';
import { submitButtonVisible } from 'actions/login';
import { signOut } from 'actions/navBar';
import { inviteStatus } from 'actions/invite';
import {
  expiredInvitationText,
  goToTeammatesPage,
  invitationLink,
  updateTokenExpiryDateInDB,
  goToInactiveTab,
  resendInvite
} from 'actions/invite';
import {
  getNotificationMessageText,
  signIn,
  postIdentity,
  getAccessToken,
  postOrganization,
  postMembership,
  postInvitesByOrganizationId
} from 'actions/common';
import { selectOrg } from 'actions/organization';
import SignInPage from 'page_objects/signInPage';
import message from 'data/messages.json';
import passiveNotification from 'data/passiveNotification.json';
import constants from 'constants.json';
var invitationURL, newMember;
const accountData = new Object();
describe('New User accesses an Expired Invitation', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
    await getAccessToken(accountData);
    await postInvitesByOrganizationId(accountData);
    newMember = accountData.inviteEmail;
    invitationURL = await invitationLink(newMember);
    await updateTokenExpiryDateInDB(newMember);
  });
  before(() => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
  });
  it('C1295647 Inactive tab status --> shows as Expired', () => {
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
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    browser.pause(1500); // workaround for Bug: ACT-299. will be removed after bugfix
    goToTeammatesPage();
    goToInactiveTab();
    expect(inviteStatus()).to.deep.equal(constants.InviteStatus.Expired);
  });

  it('C1295649 Resends Expired Invitation --> validate Passive Notification', () => {
    resendInvite();
    let expectedPassiveNotificationMessage = `${passiveNotification.resendInviteMessage.text}${newMember}`;
    expect(getNotificationMessageText()).to.include(expectedPassiveNotificationMessage);
  });

  it('C1295650 User gets new Invitation eMail and Accepts Invite', async () => {
    signOut();
    invitationURL = await invitationLink(newMember);
    browser.url(invitationURL);
  });

  it('C1295651 lands on Create Account and Join Org page', () => {
    verifyJoinOrgText(accountData.organization);
  });

  it('C1640143 Submit button is visible for creating account to join org', () => {
    expect(submitButtonVisible()).to.equal(true);
  });
});

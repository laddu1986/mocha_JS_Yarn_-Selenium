import '../../../common';
import { selectOrg } from 'actions/organization';
import {
  invalidInvitationText,
  goToTeammatesPage,
  invitationLink,
  revokeInvite,
  goToInactiveTab
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
import { signOut } from 'actions/navBar';
import passiveNotification from 'data/passiveNotification.json';
import messagesData from 'data/messages.json';
import SignInPage from 'page_objects/signInPage';
const accountData = new Object();
var invitationURL;
describe('Access a Revoked Invitation (New Account)', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
    await getAccessToken(accountData);
    await postInvitesByOrganizationId(accountData);
    let newMember = accountData.inviteEmail;
    invitationURL = await invitationLink(newMember);
  });
  before(() => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
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

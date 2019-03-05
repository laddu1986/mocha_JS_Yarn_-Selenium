import '../../common';
import SignInPage from 'page_objects/signInPage';
import {
  getNotificationMessageText,
  closePassiveNotification,
  confirmButtonIsEnabled,
  typeDeleteToConfirm,
  postIdentity,
  postOrganization,
  postMembership,
  confirmDelete
} from 'actions/common';
import {
  createNewOrg,
  selectOrg,
  verifyChooseOrgspage,
  verifyWecomeOrgPage,
  deleteOrganization,
  gotoOrgSettings,
  verifyNoOrgPage,
  clickCreateOrgFromNoOrgPage,
  clickDeleteOrgButton,
  cancelDeleteOrg
} from 'actions/organization';
import orgNotificationData from 'data/passiveNotification.json';
import { signIn } from 'actions/common';
import { signOut } from 'actions/navBar';
var newOrgName;
const accountData = new Object();
describe('Delete organization Tests', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
  });
  before(() => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
  });

  it('C1295702 Delete Org --> verify Cancel action on Delete modal', () => {
    // Blocked by https://app.clickup.com/t/czw98
    gotoOrgSettings();
    clickDeleteOrgButton();
    expect(cancelDeleteOrg()).to.equal(true);
  });

  it('C1640151 Verify Confirm button for deleting org', () => {
    clickDeleteOrgButton();
    expect(confirmButtonIsEnabled()).to.equal(false, 'Confirm button is not disabled');
  });

  it('C1640152 Verify confirm button enables after typing delete', () => {
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true, 'Confirm button is not enabled');
  });

  it('C1295703 Delete 2nd last Org --> Passive notification displays', () => {
    confirmDelete();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteMessage.text);
  });

  it('C1640153 Re-directs to choose orgs page', () => {
    closePassiveNotification();
    expect(verifyChooseOrgspage()).to.equal(true);
  });

  it('C1295704 Delete Last Org --> Passive notification displays', () => {
    selectOrg();
    gotoOrgSettings();
    deleteOrganization();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteMessage.text);
  });

  it('C1640154 Re-directs to no orgs page', () => {
    closePassiveNotification();
    expect(verifyNoOrgPage()).to.equal(true);
  });

  it('C1295705 Logout and Login --> No orgs page is displayed', () => {
    signOut();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    expect(verifyNoOrgPage()).to.equal(true);
  });

  it('C1295706 Create new Org from No - Orgs Page', () => {
    clickCreateOrgFromNoOrgPage();
    createNewOrg(newOrgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
  });
});

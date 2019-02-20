import * as lib from '../../common';
import { createAccount } from 'actions/account';
import accountPage from 'page_objects/accountPage';
import {
  getNotificationMessageText,
  closePassiveNotification,
  confirmButtonIsEnabled,
  typeDeleteToConfirm,
  confirmDelete
} from 'actions/common';
import {
  createNewOrg,
  createOrg,
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
var accountDetails,
  orgName = `${lib.randomString(10)}_Org1`,
  newOrgName = `${lib.randomString(10)}_Org2`;

describe('Delete organization Tests', () => {
  before(() => {
    accountPage.open();
    accountDetails = createAccount();
    createOrg(orgName);
  });

  it('C1295702 Delete Org --> verify Cancel action on Delete modal', () => {
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
    signIn(accountDetails.email, accountDetails.password);
    expect(verifyNoOrgPage()).to.equal(true);
  });

  it('C1295706 Create new Org from No - Orgs Page', () => {
    clickCreateOrgFromNoOrgPage();
    createNewOrg(newOrgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
  });
});

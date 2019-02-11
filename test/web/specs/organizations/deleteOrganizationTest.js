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
import { signIn, signOut } from 'actions/common';
var accountDetails,
  orgName = `${lib.randomString(10)}_Org1`,
  newOrgName = `${lib.randomString(10)}_Org2`;

describe('Delete organization Tests', () => {
  before(() => {
    accountPage.open();
    accountDetails = createAccount();
    createOrg(orgName);
  });

  it('Delete Org --> verify Cancel action on Delete modal', () => {
    gotoOrgSettings();
    clickDeleteOrgButton();
    expect(cancelDeleteOrg()).to.equal(true);
  });

  it('Verify Confirm button for deleting org', () => {
    clickDeleteOrgButton();
    expect(confirmButtonIsEnabled()).to.equal(false, 'Confirm button is not disabled');
  });

  it('Verify confirm button enables after typing delete', () => {
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true, 'Confirm button is not enabled');
  });

  it('Delete 2nd last Org --> Passive notification displays', () => {
    confirmDelete();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteMessage.text);
  });

  it('Re-directs to choose orgs page', () => {
    closePassiveNotification();
    expect(verifyChooseOrgspage()).to.equal(true);
  });

  it('Delete Last Org --> Passive notification displays', () => {
    selectOrg();
    gotoOrgSettings();
    deleteOrganization();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteMessage.text);
  });

  it('Re-directs to no orgs page', () => {
    closePassiveNotification();
    expect(verifyNoOrgPage()).to.equal(true);
  });

  it('Logout and Login --> No orgs page is displayed', () => {
    signOut();
    signIn(accountDetails.email, accountDetails.password);
    expect(verifyNoOrgPage()).to.equal(true);
  });

  it('Create new Org from No - Orgs Page', () => {
    clickCreateOrgFromNoOrgPage();
    createNewOrg(newOrgName);
    expect(verifyWecomeOrgPage()).to.equal(true);
  });
});

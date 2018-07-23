import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import SignInPage from 'web/page_objects/signInPage';
import { getNotificationMessageText, closePassiveNotification, confirmButtonIsEnabled, typeDeleteToConfirm, confirmDelete } from 'web/actions/common';
import { createNewOrg, createOrg, selectOrg, verifyChooseOrgspage, verifyWecomeOrgPage, deleteOrganization, gotoOrgSettings, verifyNoOrgPage, clickCreateOrgFromNoOrgPage, clickDeleteOrgButton, cancelDeleteOrg } from 'web/actions/organization';
import orgNotificationData from 'web/data/passiveNotification.json';
import { signIn, signOut, } from 'web/actions/common';
var accountDetails, orgName = `${lib.randomString.generate(10)}_Org1`, newOrgName = `${lib.randomString.generate(10)}_Org2`;

describe('Delete organization Tests', () => {
  before(() => {
    SignInPage.open();
    accountDetails = createAccount();
    createOrg(orgName);
  });

  it('Delete Org --> verify Cancel action on Delete modal', () => {
    gotoOrgSettings();
    clickDeleteOrgButton();
    expect(cancelDeleteOrg()).to.equal(true)
  });

  it('Delete 2nd last Org --> Passive notification displays and Re-directs to choose orgs page', () => {
    clickDeleteOrgButton();
    expect(confirmButtonIsEnabled()).to.equal(false)
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true)
    confirmDelete()
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteMessage.text)
    closePassiveNotification();
    expect(verifyChooseOrgspage()).to.equal(true);
  });

  it('Delete Last Org --> Passive notification displays and Re-directs to no orgs page', () => {
    selectOrg();
    gotoOrgSettings();
    deleteOrganization();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteMessage.text)
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
import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import SignInPage from 'web/page_objects/signInPage';
import { getNotificationMessageText, closePassiveNotification } from 'web/actions/common';
import { createNewOrg, createOrg, selectOrg, verifyChooseOrgspage, verifyOrgIsCreated, deleteOrganization, gotoOrgSettings, verifyLastOrgDeleted, clickCreateOrgFromNoOrgPage } from 'web/actions/organization';
import orgNotificationData from 'web/data/passiveNotification.json';
var accountDetails, orgName = `${lib.randomString.generate(10)}_Org1`, newOrgName = `${lib.randomString.generate(10)}_Org2`;
describe('Delete organization Tests', () => {
  before(() => {
    SignInPage.open();
    accountDetails = createAccount();
    createOrg(orgName);
  });

  it(`\nDelete 2nd last Org --> Passive notification displays and Re-directs to choose orgs page`, () => {
    gotoOrgSettings();
    deleteOrganization();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteOrgMessage.text)
    closePassiveNotification();
    expect(verifyChooseOrgspage()).to.equal(true);
  });

  it(`\nDelete Last Org --> Passive notification displays and Re-directs to no orgs page\n`, () => {
    selectOrg();
    gotoOrgSettings();
    deleteOrganization();
    expect(getNotificationMessageText()).to.include(orgNotificationData.deleteOrgMessage.text)
    closePassiveNotification();
    verifyLastOrgDeleted();
  });

  it(`Create new Org from No-Orgs Page`, () => {
    clickCreateOrgFromNoOrgPage();
    createNewOrg(newOrgName);
    expect(verifyOrgIsCreated()).to.equal(true);
  });
});


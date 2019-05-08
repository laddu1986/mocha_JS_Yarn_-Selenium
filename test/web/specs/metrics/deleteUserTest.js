import '../../common';
import AccountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'actions/space';
import { clickOnAudienceLink, clickOnSpaceDashboardLink } from 'actions/navBar';
import { addUsers, addVisitor, getCount, verifyUsersAreAdded, refreshSpaceToViewMetrics } from 'actions/metrics';
import NotificationData from 'data/passiveNotification.json';
import { clickOnUsersTab, clickUserRow, deleteUser, getFirstRowDetails, filterAudience } from 'actions/users';
import { getNotificationMessageText } from 'actions/common';
import Constants from 'constants.json';

var apiKey, deletedName;
describe('Delete User Test', () => {
  before(async () => {
    AccountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = getAPIKey();
    await addUsers(2, apiKey);
  });

  before(() => {
    clickOnAudienceLink();
    clickOnUsersTab();
    verifyUsersAreAdded();
  });

  it('C1295662 Delete User --> Verify users tab and passive notification shows', () => {
    deletedName = getFirstRowDetails(Constants.UserAttributes.UID);
    clickUserRow(undefined, Constants.UserType.User);
    browser.pause(1000);
    deleteUser();
    expect(getNotificationMessageText()).to.include(`${NotificationData.deleteMessage.text}'${deletedName}'`);
  });

  it('C1640145 Verify deleted user row is no longer showing', () => {
    expect(getFirstRowDetails(Constants.UserAttributes.UID)).to.not.include(deletedName);
  });

  it('C1295663 Adding the visitors ', async () => {
    await addVisitor(3, apiKey);
  });

  it('C1295664 Delete Visitor --> Verify passive notification shows', () => {
    browser.refresh();
    filterAudience(Constants.UserType.Visitor);
    clickUserRow(undefined, Constants.UserType.Visitor);
    browser.pause(1000);
    deleteUser();
    expect(getNotificationMessageText()).to.include(`${NotificationData.deleteMessage.text}'Visitor'`);
  });

  it('C1295665 Verify the user count on Space Dashboard', () => {
    clickOnSpaceDashboardLink();
    refreshSpaceToViewMetrics();
    expect(getCount(Constants.UserType.User)).to.include(1);
  });

  it('C1640146 Verify the visitor count on Space Dashboard', () => {
    expect(getCount(Constants.UserType.Visitor)).to.include(2);
  });
});

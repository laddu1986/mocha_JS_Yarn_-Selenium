import '../../../common';
import AccountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'web/actions/space';
import { clickOnAudienceLink, clickOnSpaceDashboardLink } from 'web/actions/navBar';
import { addUsers, addVisitor, getCount, verifyUsersAreAdded } from 'web/actions/metrics';
import NotificationData from 'web/data/passiveNotification.json';
import { clickOnUsersTab, clickUserRow, deleteUser, getFirstRowDetails } from 'web/actions/users';
import { getNotificationMessageText } from 'web/actions/common';
import Constants from 'data/constants.json';

var apiKey;
describe('Delete User Test', () => {
  before(() => {
    AccountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = getAPIKey();
  });

  before(async () => {
    await addUsers(2, apiKey);
  });

  before(() => {
    clickOnAudienceLink();
    clickOnUsersTab();
    verifyUsersAreAdded();
  });

  it('Delete User --> Verify users tab and passive notification shows', () => {
    var deletedName = getFirstRowDetails(Constants.UserAttributes.Name);
    clickUserRow(undefined, Constants.UserType.User);
    browser.pause(1000);
    deleteUser();
    expect(getNotificationMessageText()).to.include(`${NotificationData.deleteMessage.text}'${deletedName}'`);
    expect(getFirstRowDetails(Constants.UserAttributes.Name)).to.not.include(deletedName);
  });

  it('Adding the visitors ', async () => {
    await addVisitor(3, apiKey);
  });

  it('Delete Visitor --> Verify users tab and passive notification shows', () => {
    browser.refresh();
    clickUserRow(undefined, Constants.UserType.Visitor);
    browser.pause(1000);
    deleteUser();
    expect(getNotificationMessageText()).to.include(`${NotificationData.deleteMessage.text}'Visitor'`);
  });

  it('Verify the count on Space Dashboard', () => {
    clickOnSpaceDashboardLink();
    browser.pause(1500);
    expect(getCount(Constants.UserType.User)).to.include(1);
    expect(getCount(Constants.UserType.Visitor)).to.include(2);
  });
});

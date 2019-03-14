import * as lib from '../../common';
import AccountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'actions/space';
import { clickOnAudienceLink, clickOnSpaceDashboardLink } from 'actions/navBar';
import { addUsers, getCount, addVisitor, verifyUsersAreAdded, refreshSpaceToViewMetrics } from 'actions/metrics';
import Constants from 'constants.json';
import { clickOnUsersTab, getRecentUsersRows, verifyUsersDetails, clickUserRow, verifySideBar } from 'actions/users';
var apiKey;
describe(`User Metrics Tests`, () => {
  before(() => {
    AccountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = getAPIKey();
  });

  before(async () => {
    await addUsers(5, apiKey);
  });

  before(() => {
    clickOnAudienceLink();
    clickOnUsersTab();
    verifyUsersAreAdded();
  });

  it('C1295677 Audience->Users tab --> Verify User rows', () => {
    expect(getRecentUsersRows()).to.equal(5);
  });

  it('C1295678 Verify the details of users', () => {
    expect(verifyUsersDetails(lib.responseData.users)).to.equal(true);
  });

  it('C1295679 For First User --> Verify email, UID and name in side bar', () => {
    clickUserRow();
    browser.pause(1000);
    expect(verifySideBar(Constants.UserType.User)).to.equal(true);
  });

  it('C1295680 Adding the visitor ', async () => {
    await addVisitor(1, apiKey);
  });

  it('C1295681 Verify Visitor on side bar', () => {
    browser.refresh();
    clickUserRow(undefined, Constants.UserType.Visitor);
    browser.pause(1000);
    expect(verifySideBar(Constants.UserType.Visitor)).to.equal(true);
  });

  it('C1295682 Space Dashboard Page  --> Verify Total Users Count ', () => {
    clickOnSpaceDashboardLink();
    refreshSpaceToViewMetrics();

    expect(getCount(Constants.UserType.User)).to.include(5);
  });

  it('C1640147 Space Dashboard Page  --> Verify Visitors Count', () => {
    expect(getCount(Constants.UserType.Visitor)).to.include(1);
  });

  it('C1640148 Space Dashboard Page  --> Verify Active Users Count ', () => {
    expect(getCount(Constants.UserType.Active)).to.include(5);
  });

  it('C1640149 Space Dashboard Page  --> Verify New Users Count ', () => {
    expect(getCount(Constants.UserType.New)).to.include(5);
  });
});

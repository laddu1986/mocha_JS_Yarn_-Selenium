import * as lib from '../../../common';
import AccountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'web/actions/space';
import { clickOnAudienceLink, clickOnSpaceDashboardLink } from 'web/actions/navBar';
import { addUsers, getCount, addVisitor, verifyUsersAreAdded } from 'web/actions/metrics';
import Constants from 'data/constants.json';
import {
  clickOnUsersTab,
  getRecentUsersRows,
  verifyUsersDetails,
  clickUserRow,
  verifySideBar
} from 'web/actions/users';
var apiKey;
describe(`User Metrics Tests ${lib.Tags.smokeTest}`, () => {
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

  describe('Audience->Users tab', () => {
    it('Recent Users --> should be 5', () => {
      expect(getRecentUsersRows()).to.equal(5);
    });

    it('Verify the user details', () => {
      expect(verifyUsersDetails(lib.responseData.users)).to.equal(true);
    });

    it('For First User --> Verify email, UID and name in side bar', () => {
      clickUserRow();
      browser.pause(1000);
      expect(verifySideBar(Constants.UserType.User)).to.equal(true);
    });

    it('Adding the visitor ', async () => {
      await addVisitor(1, apiKey);
    });

    it('Verify Visitor on side bar', () => {
      browser.refresh();
      clickUserRow(undefined, Constants.UserType.Visitor);
      browser.pause(1000);
      expect(verifySideBar(Constants.UserType.Visitor)).to.equal(true);
    });
  });
  describe('Space Dashboard Page', () => {
    it('Total Users, Visitors, Active and New Count --> should be 5', () => {
      clickOnSpaceDashboardLink();
      browser.pause(1500);
      expect(getCount(Constants.UserType.User)).to.include(5);
      expect(getCount(Constants.UserType.Visitor)).to.include(1);
      expect(getCount(Constants.UserType.Active)).to.include(5);
      expect(getCount(Constants.UserType.New)).to.include(5);
    });
  });
});

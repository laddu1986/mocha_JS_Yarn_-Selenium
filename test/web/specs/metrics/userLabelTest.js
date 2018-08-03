import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, defaultAPIKey } from 'web/actions/space';
import { addUsers, getUserStatsCount, addVisitor } from 'web/actions/metrics';
import { clickOnUsersTab, getRecentUsersRows, verifyUsersDetails, clickFirstRow, verifySideBar } from 'web/actions/users';
var apiKey;
console.log(lib.randomString.generate(4))
describe('User Metrics Tests', () => {
  before(() => {
    accountPage.open()
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = defaultAPIKey();
    addUsers(5, apiKey);
    // backToSpaceDashboard();
  });
  describe('Audience->Users tab', () => {
    it('Recent Users --> should be 5', () => {
      clickOnAudienceLink();
      clickOnUsersTab();
      browser.pause(1000);
      expect(getRecentUsersRows()).to.equal(5);
    });
  })
})

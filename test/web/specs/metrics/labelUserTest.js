import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, defaultAPIKey } from 'web/actions/space';
import { addUsers, getUserStatsCount, addVisitor } from 'web/actions/metrics';
import { clickOnUsersTab, getRecentUsersRows, verifyUsersDetails, clickFirstRow, verifySideBar } from 'web/actions/users';
var apiKey;

describe('User Metrics Tests', () => {
  before('setup', () => {
    accountPage.open()
    createAccount();
    createSpace();
    goToDeveloperPortal();
    browser.pause(3000)
    apiKey = defaultAPIKey();
    addUsers(5, apiKey);
    // backToSpaceDashboard();
  });

  it('Recent Users --> should be 5', () => {
    clickOnAudienceLink();
    clickOnUsersTab();
    browser.pause(1000);
    expect(getRecentUsersRows()).to.equal(5);
  });
})


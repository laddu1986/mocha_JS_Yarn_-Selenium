import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, copyAPIKeyToClipBoard, copiedValue } from 'web/actions/space';
import { addUsers, getUserStatsCount, addVisitor } from 'web/actions/metrics';
import { clickOnUsersTab, getRecentUsersRows, verifyUsersDetails, clickFirstRow, verifySideBar } from 'web/actions/users';
var apiKey;

describe('User Metrics Tests', () => {
  it('setup', () => {
    accountPage.open()
    createAccount();
    createSpace();
    goToDeveloperPortal();
    copyAPIKeyToClipBoard();
    copiedValue();
    // browser.pause(3000)

    // apiKey = defaultAPIKey();
    // addUsers(5, apiKey);
    // backToSpaceDashboard();
  });

  xit('Recent Users --> should be 5', () => {
    clickOnAudienceLink();
    clickOnUsersTab();
    browser.pause(1000);
    expect(getRecentUsersRows()).to.equal(5);
  });


})


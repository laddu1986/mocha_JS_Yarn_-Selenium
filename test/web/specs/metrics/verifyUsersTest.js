import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import { createSpace, goToAPIKeyPage, defaultAPIKey } from 'web/actions/space';
import { backToSpaceDashboard, clickOnAudienceLink } from 'web/actions/navBar';
import { addUsers, getUserStatsCount } from 'web/actions/metrics';
import { clickOnUsersTab, getRecentUsersRows, verifyUsersDetails, clickFirstRow, verifySideBar } from 'web/actions/users';

describe('User Metrics Tests', () => {
    before(() => {
        SignInPage.open();
        var account = createAccount();
        console.log("*********" + account.email);
        createSpace();
        goToAPIKeyPage();
        var apiKey = defaultAPIKey();
        addUsers(5, apiKey);
    });
    describe('Space Dashboard Page', () => {
        it('Total Users, Active and New Count --> should be 5', () => {
            backToSpaceDashboard();
            browser.refresh();
            browser.pause(1500);
            expect(getUserStatsCount(0)).to.include(5);
            expect(getUserStatsCount(2)).to.include(5);
            expect(getUserStatsCount(3)).to.include(5);
        });
    });
    describe('Audience->Users tab', () => {
        it('Recent Users --> should be 5', () => {
            clickOnAudienceLink();
            clickOnUsersTab();
            browser.pause(1000);
            expect(getRecentUsersRows()).to.equal(5);
        });

        it('Verify the user details', () => {
            expect(verifyUsersDetails(lib.responseData.users)).to.equal(true);
        });

        it('For First User --> Verify email, UID and name in side bar', () => {
            clickFirstRow();
            expect(verifySideBar()).to.equal(true);
        });
    });
});
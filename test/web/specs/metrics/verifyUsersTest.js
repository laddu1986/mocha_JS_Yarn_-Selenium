import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import { createSpace, goToAPIKeyPage, defaultAPIKey } from 'web/actions/space';
import { backToSpaceDashboard, clickOnAudienceLink, clickOnSpaceDashboardLink } from 'web/actions/navBar';
import { addUsers, getUserStatsCount, addVisitor } from 'web/actions/metrics';
import Constants from 'data/constants.json'
import { clickOnUsersTab, getRecentUsersRows, verifyUsersDetails, clickFirstRow, verifySideBar } from 'web/actions/users';
var apiKey;
describe('User Metrics Tests', () => {
    before(() => {
        SignInPage.open();
        createAccount();
        createSpace();
        goToAPIKeyPage();
        apiKey = defaultAPIKey();
        addUsers(5, apiKey);
        backToSpaceDashboard();
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
            browser.pause(1000);
            expect(verifySideBar(Constants.UserType.User)).to.equal(true);
        });

        it('Verify Visitor on side bar', () => {
            addVisitor(1, apiKey);
            browser.refresh();
            clickFirstRow();
            browser.pause(1000);
            expect(verifySideBar(Constants.UserType.Visitor)).to.equal(true);
        })
    });
    describe('Space Dashboard Page', () => {
        it('Total Users, Visitors, Active and New Count --> should be 5', () => {
            clickOnSpaceDashboardLink();
            browser.pause(1500);
            expect(getUserStatsCount(0)).to.include(5);
            expect(getUserStatsCount(1)).to.include(1);
            expect(getUserStatsCount(2)).to.include(5);
            expect(getUserStatsCount(3)).to.include(5);
        });
    });
});
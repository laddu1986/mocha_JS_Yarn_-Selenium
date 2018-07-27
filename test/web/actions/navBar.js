import * as lib from '../../common';
import CommonPage from 'web/page_objects/common';
import NavBar from 'web/page_objects/navBar';

export function signOut() {
    browser.pause(200) // can be removed after AD-383 is resolved
    NavBar.profileMenu.click();
    NavBar.signOut.click();
}

export function verifySignOut() {
    return CommonPage.submitButton.isVisible();
}

export function getnavOrgCount() {
    return NavBar.navOrgs.value.length - 1;
}

export function backToSpaceDashboard() {
    return NavBar.backToSpaceDashboardLink.click();
}

export function clickOnAudienceLink() {
    NavBar.audienceLink.click();
}

export function clickOnSpaceDashboardLink() {
    NavBar.spaceDashboard.click();
}
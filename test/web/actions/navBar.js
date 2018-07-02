import * as lib from '../../common';
import CommonPage from 'web/page_objects/common';
import NavBar from 'web/page_objects/navBar';

export function signOut() {
    NavBar.profileMenu.click();
    NavBar.signOut.click();
}

export function verifySignOut() {
    return CommonPage.submitButton.isVisible();
}

export function getnavOrgCount() {
    return NavBar.navOrgs.value.length;
}
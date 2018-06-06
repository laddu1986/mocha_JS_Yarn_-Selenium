import * as lib from '../../common';
import CommonPage from 'web/page_objects/common';
import NavBar from 'web/page_objects/navBar';
import { click } from 'web/actions/actions';

export function signOut() {
    click(NavBar.profileMenu);
    click(NavBar.signOut);
}

export function verifySignOut() {
    return CommonPage.submitButton.isVisible();
}
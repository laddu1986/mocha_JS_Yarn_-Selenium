import CommonPage from '../page_objects/common';
import HomePage from '../page_objects/homePage';
import NavBar from '../page_objects/navBar';
import SignInPage from '../page_objects/signInPage';
import { click, waitForElement } from '../actions/actions';

function getNotificationMessageText() {
    waitForElement(CommonPage.successMsg);
    return CommonPage.successMsg.getText();
}

function signOut() {
    click(HomePage.profileMenu);
    click(NavBar.signOut);
    waitForElement(CommonPage.submitButton);
}

export {
    getNotificationMessageText,
    signOut
};
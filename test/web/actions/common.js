import CommonPage from '../page_objects/common';
import HomePage from '../page_objects/homePage';
import NavBar from '../page_objects/navBar';
import SignInPage from '../page_objects/signInPage';
import { click, waitForElement, setValue } from '../actions/actions';
import { web } from '../../common';

function getNotificationMessageText() {
    waitForElement(CommonPage.successMsg);
    return CommonPage.successMsg.getText();
}

function closePassiveNotification() {
    click(CommonPage.dismissNotification)
}

function signOut() {
    click(HomePage.profileMenu);
    click(NavBar.signOut);
    waitForElement(CommonPage.submitButton);
}

export function signIn(email, password) {
    setValue(SignInPage.emailInput, email);
    setValue(SignInPage.passwordInput, password);
    click(CommonPage.submitButton);
    waitForElement(HomePage.profileMenu);
}

export {
    getNotificationMessageText,
    closePassiveNotification,
    signOut,

};
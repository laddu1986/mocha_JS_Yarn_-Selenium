import NavBar from '../page_objects/navBar';
import CommonPage from '../page_objects/common';
import { click, waitForElement, setValue } from '../actions/actions';
import SignInPage from '../page_objects/signInPage'

function getNotificationMessageText() {
    waitForElement(CommonPage.successMsg);
    return CommonPage.successMsg.getText();
}

function closePassiveNotification() {
    click(CommonPage.dismissNotification)
}

function signOut() {
    click(NavBar.profileMenu);
    click(NavBar.signOut);
    waitForElement(CommonPage.submitButton);
}

function signIn(email, password) {
    setValue(SignInPage.emailInput, email);
    setValue(SignInPage.passwordInput, password);
    click(CommonPage.submitButton);
    waitForElement(NavBar.profileMenu);
}

export {
    getNotificationMessageText,
    closePassiveNotification,
    signOut,
    signIn
};
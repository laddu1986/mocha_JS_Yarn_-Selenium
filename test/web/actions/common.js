import NavBar from '../page_objects/navBar';
import CommonPage from '../page_objects/common';
import { click, waitForElement, setValue } from '../actions/actions';
import SignInPage from '../page_objects/signInPage'

export function getNotificationMessageText() {
    waitForElement(CommonPage.successMsg);
    return CommonPage.successMsg.getText();
}

export function closePassiveNotification() {
    click(CommonPage.dismissNotification)
    return notificationMsg;
}

export function signOut() {
    click(NavBar.profileMenu);
    click(NavBar.signOut);
    waitForElement(CommonPage.submitButton);
}

export function signIn(email, password) {
    setValue(SignInPage.emailInput, email);
    setValue(SignInPage.passwordInput, password);
    click(CommonPage.submitButton);
    waitForElement(NavBar.profileMenu);
}

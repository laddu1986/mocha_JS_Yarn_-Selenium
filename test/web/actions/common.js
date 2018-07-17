import NavBar from '../page_objects/navBar';
import CommonPage from '../page_objects/common';
import SignInPage from '../page_objects/signInPage'

export function getNotificationMessageText() {
    CommonPage.successMsg.waitForVisible();
    return CommonPage.successMsg.getText();
}

export function closePassiveNotification() {
    CommonPage.dismissNotification.click()
}

export function signOut() {
    NavBar.profileMenu.click();
    NavBar.signOut.click();
    CommonPage.submitButton.waitForVisible();
}

export function signIn(email, password) {
    SignInPage.emailInput.setValue(email);
    SignInPage.passwordInput.setValue(password);
    CommonPage.submitButton.click();
    NavBar.profileMenu.waitForVisible();
}

export function get404PageText() {
    return CommonPage.invalidPage.getText();
}

export function clickLinkOn404Page() {
    CommonPage.linkOnInvalidpage.click();
}

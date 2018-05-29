import NavBar from '../page_objects/navBar';
import CommonPage from '../page_objects/common';
import { click, waitForElement, setValue } from '../actions/actions';
import SignInPage from '../page_objects/signInPage'

function getNotificationMessageText() {
    waitForElement(CommonPage.successMsg);
    const notificationMsg = CommonPage.successMsg.getText();
    click(CommonPage.dismissNotification)
    return notificationMsg;
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
    signOut,
    signIn
};
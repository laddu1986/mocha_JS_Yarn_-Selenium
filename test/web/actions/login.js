import * as lib from '../../common';
import CommonPage from 'web/page_objects/common'
import HomePage from 'web/page_objects/homePage'
import SignInPage from 'web/page_objects/signInPage'
import { click, waitForElement, setValue } from '../actions/actions';

export function verifyIncorrectSignIn() {
    waitForElement(SignInPage.incorrectDetails);
    return SignInPage.incorrectDetails.getText()
}

export function verifySignIn() {
    return HomePage.profileMenu.isVisible()
}

export function signIn(email, password) {
    waitForElement(SignInPage.emailInput);
    setValue(SignInPage.emailInput, email);
    setValue(SignInPage.passwordInput, password);
    click(CommonPage.submitButton);
}

export function submitEmail() {
    setValue(SignInPage.emailInput, 'forgot@password.com');
    click(CommonPage.submitButton);
}

export function backToSignInButtonVisible() {
    return SignInPage.backToSignIn.isVisible();
}

export function submitButtonVisible() {
    return CommonPage.submitButton.isVisible();
}

export function clickForgotPassword() {
    click(SignInPage.forgotPassword);
}

export function clickBackToSignIn() {
    click(SignInPage.backToSignIn);
    waitForElement(SignInPage.forgotPassword);
}

export function emailInputValue() {
    return SignInPage.emailInput.getValue();
}

export function clearPlaceholder() {
    SignInPage.emailInput.clearElement();
    SignInPage.passwordInput.clearElement();
}
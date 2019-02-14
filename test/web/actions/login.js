import '../common';
import CommonPage from 'page_objects/common';
import NavBar from 'page_objects/navBar';
import SignInPage from 'page_objects/signInPage';
import * as validationMessage from 'data/messages';

export function verifyIncorrectSignIn() {
  return SignInPage.incorrectDetails.getText();
}

export function verifySignIn() {
  return NavBar.profileMenu.isVisible();
}

export function verifySignInError() {
  browser.waitUntil(
    () => SignInPage.passwordError.getText() === validationMessage.login.invalidLogin,
    5000,
    'Error did not appear for password field',
    200
  );
  browser.waitUntil(
    () => SignInPage.emailError.getText() === validationMessage.login.invalidLogin,
    5000,
    'Error did not appear for email field',
    200
  );
}

export function submitEmail() {
  SignInPage.emailInput.setValue('forgot@password.com');
  CommonPage.submitButton.click();
}

export function backToSignInButtonVisible() {
  return SignInPage.backToSignIn.isVisible();
}

export function submitButtonVisible() {
  return CommonPage.submitButton.isVisible();
}

export function clickForgotPassword() {
  SignInPage.forgotPassword.click();
}

export function clickBackToSignIn() {
  SignInPage.backToSignIn.click();
}

export function emailInputValue() {
  return SignInPage.emailInput.getValue();
}

export function clearPlaceholder() {
  SignInPage.emailInput.clearElement();
  SignInPage.passwordInput.clearElement();
}

export function submitButtonText() {
  return CommonPage.submitButton.getText();
}

export function signInPageIsVisible() {
  return SignInPage.emailInput.isVisible();
}

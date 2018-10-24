import '../common';
import CommonPage from 'page_objects/common';
import NavBar from 'page_objects/navBar';
import SignInPage from 'page_objects/signInPage';
import { hideIntercom } from 'actions/common';

export function verifyIncorrectSignIn() {
  return SignInPage.incorrectDetails.getText();
}

export function verifySignIn() {
  return NavBar.profileMenu.isVisible();
}

export function signIn(email, password) {
  SignInPage.emailInput.setValue(email);
  SignInPage.passwordInput.setValue(password);
  CommonPage.submitButton.click();
  hideIntercom();
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

import * as lib from '../../common';
import CommonPage from 'web/page_objects/common'
import SignInPage from 'web/page_objects/signInPage'
import { click, waitForElement, setValue } from '../actions/actions';

export function verifyIncorrectSignIn() {
    waitForElement(SignInPage.incorrectDetails);
    return SignInPage.incorrectDetails.getText()
}

export function incorrectSignIn(email, password) {
    setValue(SignInPage.emailInput, email);
    setValue(SignInPage.passwordInput, password);
    click(CommonPage.submitButton);
}
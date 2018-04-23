import SignInPage from '../page_objects/signInPage';

import * as lib from '../../common';

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}

function waitForElement(wfe) {
  wfe.waitForExist();
  wfe.waitForVisible();
}

function setValue(sv, data) {
  sv.setValue(data);
}

function click(c) {
  c.click();
}

describe('Sign in page', () => {
  before('Open App URL', () => {
    SignInPage.open(lib.config.api.base);
  });


  it('Check Forgot Password link', () => {
    waitForElement(SignInPage.forgotPassword);
    click(SignInPage.forgotPassword);

    waitForElement(SignInPage.emailInput);
    setValue(SignInPage.emailInput, 'forgot@password.com');

    waitForElement(SignInPage.signInButton);
    click(SignInPage.signInButton);

    waitForElement(SignInPage.backToSignIn);

    waitForElement(SignInPage.backToSignIn);
    click(SignInPage.backToSignIn);

    const backToSignInPage = SignInPage.forgotPassword.isVisible();
  });


  after('End message', () => {
    // lib.end()
  });
});


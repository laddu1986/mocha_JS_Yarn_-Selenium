import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}

describe('Test Forgot Password Link', () => {
  it('Open App URL', () => {
    SignInPage.open();
  });

  it('Click Forgot Password link', () => {
    click(SignInPage.forgotPassword);
  });

  it('Enter your Email', () => {
    setValue(SignInPage.emailInput, 'forgot@password.com');
  });

  it('Click Send me Link button', () => {
    click(SignInPage.signInButton);
  });

  it('Click Back to Sign In button', () => {
    click(SignInPage.backToSignIn);
  });

  it('Should re-direct to Sign in page', () => {
    waitForElement(SignInPage.forgotPassword);
  });

  it('Email field should be pre-populated with the user Email', () => {
    waitForElement(SignInPage.emailInput);
    expect(SignInPage.emailInput.getValue()).to.include('forgot@password.com');
  });

});


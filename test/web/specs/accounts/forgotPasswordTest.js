import '../../common';
import SignInPage from 'page_objects/signInPage';
import {
  emailInputValue,
  clickBackToSignIn,
  clickForgotPassword,
  submitButtonVisible,
  submitEmail,
  backToSignInButtonVisible
} from 'actions/login';

describe('Test Forgot Password Link', () => {
  before('Open App URL', () => {
    SignInPage.open();
  });

  it('Click Forgot Password link', () => {
    clickForgotPassword();
    expect(submitButtonVisible()).to.equal(true);
  });

  it('Submit your Email', () => {
    submitEmail();
    expect(backToSignInButtonVisible()).to.equal(true);
  });

  it('Click Back to Sign In button', () => {
    clickBackToSignIn();
    expect(emailInputValue()).to.include('forgot@password.com');
  });
});

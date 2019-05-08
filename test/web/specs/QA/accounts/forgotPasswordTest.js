import '../../../common';
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

  it('C1295635 Click Forgot Password link', () => {
    clickForgotPassword();
    expect(submitButtonVisible()).to.equal(true);
  });

  it('C1295636 Submit your Email', () => {
    submitEmail();
    expect(backToSignInButtonVisible()).to.equal(true);
  });

  it('C1295637 Click Back to Sign In button', () => {
    clickBackToSignIn();
    expect(emailInputValue()).to.include('forgot@password.com');
  });
});

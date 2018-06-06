import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
<<<<<<< HEAD
import CommonPage from 'web/page_objects/common';
import { setValue, click, waitForElement } from 'web/actions/actions'

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}
=======
import { emailInputValue, clickBackToSignIn, clickForgotPassword, submitButtonVisible, submitEmail, backToSignInButtonVisible } from 'web/actions/login';
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595

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


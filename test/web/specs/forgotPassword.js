import SignInPage from '../page_objects/signInPage';

import * as lib from '../../common';

function assertion(e, data) {
  //   console.log(e);
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
    // lib.connection({
    //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
    //   user: 'rouser',
    //   password: 'R34d0nlyK3y',
    //   database: 'membership_test',
    // });

    // console.log(lib.config.api.createAccount);
    SignInPage.open(lib.config.api.base);
  });


  it('Check Forgot Password link', () => {
    waitForElement(SignInPage.forgotPassword);
    click(SignInPage.forgotPassword);

    waitForElement(SignInPage.emailInput)
    setValue(SignInPage.emailInput, 'forgot@password.com');

    waitForElement(SignInPage.signInButton);
    click(SignInPage.signInButton);

    waitForElement(SignInPage.backToSignIn)
    console.log((SignInPage.backToSignIn).getText())

    waitForElement(SignInPage.backToSignIn)
    click(SignInPage.backToSignIn)

    const backToSignInPage = SignInPage.forgotPassword.isVisible();
    console.log(backToSignInPage)




  });


  after('End message', () => {
    // lib.end();
  });
});


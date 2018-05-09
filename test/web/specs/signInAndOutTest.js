import SignInPage from '../page_objects/signInPage';
import HomePage from '../page_objects/homePage';

import * as lib from '../../common';
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions';

// function name(params) {
//   let text = ''
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//   for (let i = 0 i < params i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

//   return text
// }


function assertion(e, data) {
  //   console.log(e)
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}


let signInSuccess;

describe('Tests for Sign Page', () => {
  before('Open Sign In page', () => {
    SignInPage.open();
  });

  it('Should throw an error while Signing In with Blank data', () => {
    waitForElement(SignInPage.emailInput);
    waitForElement(SignInPage.passwordInput);
    waitForElement(SignInPage.signInButton);

    SignInPage.emailInput.clearElement();
    SignInPage.passwordInput.clearElement();

    click(SignInPage.signInButton);

    expect(SignInPage.emailError.isVisible()).to.equal(true);
    expect(SignInPage.passwordError.isVisible()).to.equal(true);

    const emailErr = SignInPage.emailError.getText();
    const passwordErr = SignInPage.passwordError.getText();

    expect(emailErr).to.equal('This is a required field');
    expect(passwordErr).to.equal('This is a required field');
  });


  it('Should throw an error while Signing In with Incorrect credentials', () => {
    waitForElement(SignInPage.emailInput);
    SignInPage.emailInput.clearElement();
    browser.pause(1000)
      //setValue(SignInPage.emailInput, 'incorrect@email.com');
      (SignInPage.emailInput).setValue('incorrect@email.com')

    waitForElement(SignInPage.passwordInput);
    SignInPage.passwordInput.clearElement();
    browser.pause(1000)

    setValue(SignInPage.passwordInput, 'Incorrect@Password123');
    browser.pause(1000)


    click(SignInPage.signInButton);

    waitForElement(SignInPage.incorrectDetails);
    const signInErrMsg = SignInPage.incorrectDetails.getText();
    expect(signInErrMsg).to.include('incorrect');
  });


  it('Should Sign In successfully with Correct credentials', () => {
    setValue(SignInPage.emailInput, 'testaccount@donotdeleteplease.com');
    setValue(SignInPage.passwordInput, 'Pass1234');
    click(SignInPage.signInButton);
    waitForElement(HomePage.profileMenu);
    signInSuccess = HomePage.profileMenu.isVisible();
    expect(signInSuccess).to.equal(true);
  });

  it('Should Sign Out successfully', () => {
    if (signInSuccess === true) {
      click(HomePage.profileMenu);
      click(HomePage.signOut);

      waitForElement(SignInPage.signInButton);
      expect(SignInPage.signInButton.isVisible()).to.equal(true);
    } else {
      console.log('User not Signed in');
    }
  });
});


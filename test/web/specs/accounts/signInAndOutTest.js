import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
<<<<<<< HEAD
import HomePage from 'web/page_objects/homePage';
import NavBar from 'web/page_objects/navBar';
import CommonPage from 'web/page_objects/common';
import { openApp, setValue, click, waitForElement } from 'web/actions/actions'
=======
import { signIn, clearPlaceholder, verifySignIn } from 'web/actions/login';
import { signOut, verifySignOut } from 'web/actions/navBar';
import * as validationMessage from 'web/data/messages';
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595

describe('Sign In/Out Test', () => {
  before('Open Sign In page', () => {
    SignInPage.open();
  });

  it(`\nSign In with Blank data --> Throws an error\n`, () => {
    clearPlaceholder();
    signIn('', '');
    expect(SignInPage.emailError.getText()).to.equal(validationMessage.invalidLogin);
    expect(SignInPage.passwordError.getText()).to.equal(validationMessage.invalidLogin);
  });

  it('Sign In with correct credentials --> successful', () => {
    clearPlaceholder();
    signIn('testaccount@donotdeleteplease.com', 'Pass1234');
    expect(verifySignIn()).to.equal(true);
  });

  it('Sign out', () => {
    signOut();
    expect(verifySignOut()).to.equal(true);
  });
});



import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
import { signIn, clearPlaceholder, verifySignIn } from 'web/actions/login';
import { signOut, verifySignOut } from 'web/actions/navBar';
import * as validationMessage from 'web/data/messages';

describe(`Sign In/Out Test ${lib.Tags.smokeTest}`, () => {
  before('Open Sign In page', () => {
    SignInPage.open();
  });

  it(`\nSign In with Blank data --> Throws an error\n`, () => {
    clearPlaceholder();
    signIn('', '');
    expect(SignInPage.emailError.getText()).to.equal(validationMessage.login.invalidLogin);
    expect(SignInPage.passwordError.getText()).to.equal(validationMessage.login.invalidLogin);
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



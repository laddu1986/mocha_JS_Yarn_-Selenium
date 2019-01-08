import * as lib from '../../common';
import SignInPage from 'page_objects/signInPage';
import { signIn, clearPlaceholder, verifySignIn, verifySignInError } from 'actions/login';
import { signOut, verifySignOut } from 'actions/navBar';

describe(`Sign In/Out Test ${lib.Tags.smokeTest}`, () => {
  before('Open Sign In page', () => {
    SignInPage.open();
  });

  it('Sign In with Blank data --> Throws an error', () => {
    clearPlaceholder();
    signIn('', '');
    verifySignInError();
  });

  it('Sign In with correct credentials --> successful', () => {
    clearPlaceholder();
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
    expect(verifySignIn()).to.equal(true);
  });

  it('Sign out', () => {
    signOut();
    expect(verifySignOut()).to.equal(true);
  });
});

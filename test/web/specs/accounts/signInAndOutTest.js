import * as lib from '../../common';
import SignInPage from 'page_objects/signInPage';
import { signIn } from 'actions/common';
import { errorSignIn } from 'actions/login';
import { clearPlaceholder, verifySignIn, verifySignInError } from 'actions/login';
import { signOut, verifySignOut } from 'actions/navBar';

describe(`Sign In/Out Test ${lib.Tags.smokeTest}`, () => {
  before('Open Sign In page', () => {
    SignInPage.open();
  });

  it('C1295638 Sign In with Blank data --> Throws an error', () => {
    clearPlaceholder();
    errorSignIn('', '');
    verifySignInError();
  });

  it('C1295639 Sign In with correct credentials --> successful', () => {
    clearPlaceholder();
    signIn('testaccount@donotdeleteplease.com', process.env.ACCOUNT_PASS);
    expect(verifySignIn()).to.equal(true);
  });

  it('C1295640 Sign out', () => {
    signOut();
    expect(verifySignOut()).to.equal(true);
  });
});

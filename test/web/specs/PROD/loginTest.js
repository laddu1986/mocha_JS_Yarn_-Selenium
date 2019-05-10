import '../../common';
import SignInPage from 'page_objects/signInPage';
import { signIn } from 'actions/common';
import { verifySignIn } from 'actions/login';
import { signOut, verifySignOut } from 'actions/navBar';

describe('Sign In/Out Test', () => {
  before('Open Sign In page', () => {
    SignInPage.open();
  });

  it('C2133657 Sign In', () => {
    signIn(smokeEmail, smokePassword); // eslint-disable-line
    expect(verifySignIn()).to.equal(true);
  });

  it('C2133658 Sign out', () => {
    signOut();
    expect(verifySignOut()).to.equal(true);
  });
});

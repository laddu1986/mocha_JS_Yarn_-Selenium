import '../../common';
import SignInPage from 'page_objects/signInPage';
import { signIn } from 'actions/common';
import { clearPlaceholder, verifySignIn } from 'actions/login';
import { signOut, verifySignOut } from 'actions/navBar';

describe('Sign In/Out Test', () => {
    before('Open Sign In page', () => {
        SignInPage.open();
    });

    it('Sign In', () => {
        signIn(process.env.PROD_LOGIN_EMAIL, process.env.PROD_LOGIN_PASSWORD);
        expect(verifySignIn()).to.equal(true);
    });

    it('Sign out', () => {
        signOut();
        expect(verifySignOut()).to.equal(true);
    });
});
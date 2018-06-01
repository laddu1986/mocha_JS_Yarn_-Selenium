/* https://appcurator.atlassian.net/browse/ACT-35

ACCEPTANCE CRITERIA

Member must be able to delete account if not associated with any Org
Page URL: /organizations
Upon clicking / tapping on 'Delete my account', display a confirmation prompt to delete the account
After confirming to delete the account, member should be redirected to 'Sign in' page
Attempt to sign in should fail for deleted account
*/

import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import SignInPage from 'web/page_objects/signInPage';
import { deleteAccount, deleteOrg } from 'web/actions/createOrg';
import { verifyIncorrectSignIn, incorrectSignIn } from 'web/actions/login';
var accountDetails;

describe('Delete Account Test (Remove my Account)', () => {
  before('Create account and delete organisation', () => {
    SignInPage.open();
    accountDetails = createAccount();
    deleteOrg();
  });

  it(`\nRemove account --> Sign In page appears\n`, () => {
    deleteAccount();
    expect(browser.getUrl()).to.equal(`${lib.config.web.base}/sign-in`);
  });

  it('Login with same credentials --> Incorrect Details Error', () => {
    incorrectSignIn(accountDetails.email, 'Pass1234');
    expect(verifyIncorrectSignIn()).to.include('incorrect');
  });
});

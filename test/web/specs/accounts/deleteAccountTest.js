/* https://appcurator.atlassian.net/browse/ACT-35
ACCEPTANCE CRITERIA
Member must be able to delete account if not associated with any Org
Page URL: /organizations
Upon clicking / tapping on 'Delete my account', display a confirmation prompt to delete the account
After confirming to delete the account, member should be redirected to 'Sign in' page
Attempt to sign in should fail for deleted account
*/

import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import SignInPage from 'web/page_objects/signInPage';
import { deleteAccount, deleteOrganization, gotoOrgSettings } from 'web/actions/organization';
import { verifyIncorrectSignIn, signIn } from 'web/actions/login';
import { verifyOrgDashboardPageAppears } from 'web/actions/account';
var accountDetails;

describe('Delete Account Test (Remove my Account)', () => {
  before('Create account and delete organisation', () => {
    SignInPage.open();
    accountDetails = createAccount();
    gotoOrgSettings();
    deleteOrganization();
  });

  it(`\nRemove account --> Sign In page appears\n`, () => {
    deleteAccount();
    expect(browser.getUrl()).to.equal(`${process.env.WEB_DEV}/sign-in`);
  });

  it('Login with same credentials --> Incorrect Details Error', () => {
    signIn(accountDetails.email, 'Pass1234');
    expect(verifyIncorrectSignIn()).to.include('incorrect');
  });

  it('Re-registeration with same email is allowed', () => {
    createAccount(accountDetails.email);
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});
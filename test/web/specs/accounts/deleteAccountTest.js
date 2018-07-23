/* https://appcurator.atlassian.net/browse/ACT-35
ACCEPTANCE CRITERIA
Member must be able to delete account if not associated with any Org
Page URL: /organizations
Upon clicking / tapping on 'Delete my account', display a confirmation prompt to delete the account
After confirming to delete the account, member should be redirected to 'Sign in' page
Attempt to sign in should fail for deleted account
*/

import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
import { createAccount } from 'web/actions/account';
import { deleteOrganization, gotoOrgSettings } from 'web/actions/organization';
import { verifyIncorrectSignIn, signIn, signInPageIsVisible } from 'web/actions/login';
import { verifyOrgDashboardPageAppears, deleteAccount, clickDeleteAccButton, cancelDeleteAccount } from 'web/actions/account';
import { confirmButtonIsEnabled, confirmDelete, typeDeleteToConfirm } from 'web/actions/common'
var accountDetails;

describe('Delete Account Test (Remove my Account)', () => {
  before('Create account and delete organisation', () => {
    SignInPage.open();
    accountDetails = createAccount();
    gotoOrgSettings();
    deleteOrganization();
  });

  it('Remove account --> verify Cancel action on Delete modal', () => {
    clickDeleteAccButton()
    expect(cancelDeleteAccount()).to.equal(true)
  });

  it('Remove account --> Sign In page appears', () => {
    clickDeleteAccButton();
    expect(confirmButtonIsEnabled()).to.equal(false)
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true)
    confirmDelete()
    expect(signInPageIsVisible()).to.equal(true)
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
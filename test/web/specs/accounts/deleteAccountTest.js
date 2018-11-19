/* https://appcurator.atlassian.net/browse/ACT-35
ACCEPTANCE CRITERIA
Member must be able to delete account if not associated with any Org
Page URL: /organizations
Upon clicking / tapping on 'Delete my account', display a confirmation prompt to delete the account
After confirming to delete the account, member should be redirected to 'Sign in' page
Attempt to sign in should fail for deleted account
*/

import '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { deleteOrganization, gotoOrgSettings } from 'actions/organization';
import { verifyIncorrectSignIn, signIn, signInPageIsVisible } from 'actions/login';
import {
  verifyOrgDashboardPageAppears,
  clickCreateAccountLink,
  clickDeleteAccButton,
  cancelDeleteAccount
} from 'actions/account';
import { confirmButtonIsEnabled, confirmDelete, typeDeleteToConfirm } from 'actions/common';
var accountDetails;

describe('Delete Account Test (Remove my Account)', () => {
  before('Create account and delete organisation', () => {
    accountPage.open();
    accountDetails = createAccount();
    gotoOrgSettings();
    deleteOrganization();
  });

  it('C1295631 Remove account --> verify Cancel action on Delete modal', () => {
    clickDeleteAccButton();
    expect(cancelDeleteAccount()).to.equal(true);
  });

  it('C1295632 Remove account --> Sign In page appears', () => {
    clickDeleteAccButton();
    expect(confirmButtonIsEnabled()).to.equal(false);
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true);
    confirmDelete();
    expect(signInPageIsVisible()).to.equal(true);
    expect(browser.getUrl()).to.equal(`${browser.options.baseUrl}/sign-in`);
  });

  it('C1295633 Login with same credentials --> Incorrect Details Error', () => {
    signIn(accountDetails.email, process.env.ACCOUNT_PASS);
    expect(verifyIncorrectSignIn()).to.include('incorrect');
  });

  it('C1295634 Re-registeration with same email is allowed', () => {
    clickCreateAccountLink();
    createAccount(accountDetails.email);
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});

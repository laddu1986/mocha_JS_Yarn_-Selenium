/* https://appcurator.atlassian.net/browse/ACT-35
ACCEPTANCE CRITERIA
Member must be able to delete account if not associated with any Org
Page URL: /organizations
Upon clicking / tapping on 'Delete my account', display a confirmation prompt to delete the account
After confirming to delete the account, member should be redirected to 'Sign in' page
Attempt to sign in should fail for deleted account
*/

import '../../common';
import { errorSignIn } from 'actions/login';
import SignInPage from 'page_objects/signInPage';
import { createAccount } from 'actions/account';
import { deleteOrganization, gotoOrgSettings, selectOrg } from 'actions/organization';
import { verifyIncorrectSignIn, clearPlaceholder, signInPageIsVisible } from 'actions/login';
import {
  verifyOrgDashboardPageAppears,
  clickCreateAccountLink,
  clickDeleteAccButton,
  cancelDeleteAccount
} from 'actions/account';
import {
  signIn,
  confirmButtonIsEnabled,
  confirmDelete,
  typeDeleteToConfirm,
  postIdentity,
  postOrganization,
  postMembership
} from 'actions/common';
const accountData = new Object();

describe('Delete Account Test (Remove my Account)', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
  });
  before('Create account and delete organisation', () => {
    SignInPage.open();
    clearPlaceholder();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
    gotoOrgSettings();
    deleteOrganization();
  });

  it('C1295631 Remove account --> verify Cancel action on Delete modal', () => {
    clickDeleteAccButton();
    expect(cancelDeleteAccount()).to.equal(true);
  });

  it('C1295632 Click delete account --> confirm button is disabled', () => {
    clickDeleteAccButton();
    expect(confirmButtonIsEnabled()).to.equal(false, 'Confirm button should be disabled');
  });

  it('C1640116 Remove account --> Sign In page appears', () => {
    typeDeleteToConfirm();
    expect(confirmButtonIsEnabled()).to.equal(true, 'Confirm button should be enabled');
    confirmDelete();
    expect(signInPageIsVisible()).to.equal(true, 'Sign in page did not appear correctly');
    expect(browser.getUrl()).to.equal(`${browser.options.baseUrl}/sign-in`);
  });

  it('C1295633 Login with same credentials --> Incorrect Details Error', () => {
    errorSignIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    expect(verifyIncorrectSignIn()).to.include('incorrect');
  });

  it('C1295634 Re-registeration with same email is allowed', () => {
    clickCreateAccountLink();
    createAccount();
    expect(verifyOrgDashboardPageAppears()).to.equal(true, 'Re-registration is not successful');
  });
});

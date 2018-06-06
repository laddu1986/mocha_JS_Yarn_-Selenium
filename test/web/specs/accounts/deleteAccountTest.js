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
<<<<<<< HEAD
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import SettingsPage from 'web/page_objects/settingsPage';
import Page from 'web/page_objects/page';
import { openApp, setValue, click, waitForElement } from 'web/actions/actions'
import CommonPage from 'web/page_objects/common';

const name = lib.randomString.generate(10);
const email = `${lib.randomString.generate(15)}@test.co`;
const organization = 'OrgDeleteAccount';
const password = 'Pass1234';

describe('Delete Acount Test (Remove my Account)', () => {
  describe('Create Account', () => {
    before('Open App URL', () => {
      SignInPage.open();
    });

    it('Create Account with OrgDeleteAccount Org and Sign In', () => {
      click(CreateAccountPage.createAccountLink);
      setValue(CreateAccountPage.nameInput, name);
      setValue(CreateAccountPage.emailInput, email);
      setValue(CreateAccountPage.organizationInput, organization);
      setValue(CreateAccountPage.passwordInput, password);
      click(CommonPage.submitButton);

      console.log('Test Data : -  \n' +
        `name = ${name}\n` +
        `email = ${email}\n` +
        `organization = ${organization}\n` +
        `password = ${password}`);
    });

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard();

      const currentOrgName = OrgDashboardPage.currentOrgName.getText();
      expect(organization).to.include(currentOrgName);
    });
  });


  describe('Leaving OrgDeleteAccount re-directs to No Orgs page', () => {
    it('Goto Organization Settings of OrgDeleteAccount', () => {
      gotoOrgSettings();

    });

    it('Click Delete Organization', () => {
      clickDeleteOrganization();
    });


    it('Should re-direct to No Orgs page after deleting the last Org', () => {
      waitForElement(HomePage.noOrgs);
      waitForElement(HomePage.createOrgButton);

      const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled();
      expect(createOrgButtonEnabled).to.equal(true);
    });

    it('Validate URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.web}/organizations`);
    });
  });

  describe('Removing account ends the session and redirects to Sign In page', () => {
    it('Click Remove my account', () => {
      waitForElement(HomePage.removeAccountButton);
      click(HomePage.removeAccountButton);
    });

    it('Confirm Deletion', () => {
      click(CommonPage.submitButton);
    });

    it('Click Ok to Confirm Account deletion', () => {
      click(CommonPage.submitButton);
    });

    it('Should re-direct to Sign In page after deleting my Account', () => {
      waitForElement(CommonPage.submitButton);
      expect(browser.getUrl()).to.equal(`${lib.web}/sign-in`);
    });
=======
import { deleteAccount, deleteOrg } from 'web/actions/organization';
import { verifyIncorrectSignIn, signIn } from 'web/actions/login';
import { verifyOrgDashboardPageAppears } from 'web/actions/account';
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
    signIn(accountDetails.email, 'Pass1234');
    expect(verifyIncorrectSignIn()).to.include('incorrect');
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595
  });

  it('Re-registeration with same email is allowed', () => {
    createAccount(accountDetails.email);
    expect(verifyOrgDashboardPageAppears()).to.equal(true);
  });
});
<<<<<<< HEAD

function gotoOrgSettings() {
  click(HomePage.profileMenu);
  click(OrgDashboardPage.orgSettingsNavMenu);
}

function clickDeleteOrganization() {
  click(SettingsPage.orgSettingsPage);
  browser.pause(500); // for safari
  click(SettingsPage.leaveOrgButton);
  click(CommonPage.submitButton);
}

function viewOrgDashboard() {
  waitForElement(OrgDashboardPage.currentOrgName);
  waitForElement(OrgDashboardPage.welcomeMsg);
}

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}
=======
>>>>>>> 0c2ee244a544538ce518c6883fd0015de1c64595

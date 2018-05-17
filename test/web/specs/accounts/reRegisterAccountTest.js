/* https://appcurator.atlassian.net/browse/ACT-47

ACCEPTANCE CRITERIA
Upon completely removing self from App Curator, a member must be able to reuse the previously used email address to re-register
Registration is done via /sign-up page, hence rest of the flow is similar to the registration flow
*/


import * as lib from '../../../common';
import CreateAccountPage from 'web/page_objects/createAccountPage';
import HomePage from 'web/page_objects/homePage';
import SignInPage from 'web/page_objects/signInPage';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import SettingsPage from 'web/page_objects/settingsPage';
import Page from 'web/page_objects/page';
import CommonPage from 'web/page_objects/common';
import { openApp, setValue, click, waitForElement, waitForEnabled } from 'web/actions/actions'

const name = lib.bigName(10);
const email = `${lib.bigName(15)}@test.co`;
const organization = 'OrgReRegisterMe';
const password = 'Pass1234';


describe('Delete Acount Test (Remove my Account)', () => {
  describe('Create Account', () => {
    before('Open App URL', () => {
      SignInPage.open();
    });

    it('Create Account and Sign In', () => {
      click(CreateAccountPage.createAccountLink);

      setValue(CreateAccountPage.nameInput, name);
      setValue(CreateAccountPage.emailInput, email);
      setValue(CreateAccountPage.organizationInput, organization);
      setValue(CreateAccountPage.passwordInput, password);

      click(CommonPage.submitButton);
      waitForElement(HomePage.logo);
      console.log('Test Data : -  \n' +
        `name = ${name}\n` +
        `email = ${email}\n` +
        `organization = ${organization}\n` +
        `password = ${password}`);
    });

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard();
      expect(OrgDashboardPage.currentOrgName.getText()).to.include(organization);
    });
  });


  describe('Leaving OrgReRegisterMe re-directs to No Orgs page', () => {
    it('Goto Organization Settings of OrgReRegisterMe', () => {
      gotoOrgSettings();
    });

    it('Click Delete Organization', () => {
      clickDeleteOrganization();
    });

    it('Accept Confirmation', () => {
      click(CommonPage.submitButton);

    });

    it('Should re-direct to No Orgs page after deleting the last Org', () => {
      waitForElement(HomePage.noOrgs);
      waitForElement(HomePage.createOrgButton);

      const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled();
      expect(createOrgButtonEnabled).to.equal(true);
    });

    it('Validate URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}/organizations`);
    });
  });

  describe('Removing account ends the session and redirects to Sign In page', () => {
    it('Click Remove my account', () => {
      click(HomePage.removeAccountButton);
    });

    it('Accept Confirmation', () => {
      click(CommonPage.submitButton);

    });

    it('Should re-direct to Sign In page after deleting my Account', () => {
      waitForElement(CommonPage.submitButton);
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}/sign-in`);
    });
  });


  describe('Should allow re-registering with same details', () => {
    it('Create Account with same details as above', () => {
      createAccount();
    });

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard();
      expect(OrgDashboardPage.currentOrgName.getText()).to.include(organization);
    });
  });
});

function gotoOrgSettings() {
  click(HomePage.profileMenu);
  click(OrgDashboardPage.orgSettingsNavMenu);
}

function clickDeleteOrganization() {
  click(SettingsPage.orgSettingsPage);
  browser.pause(500); // for safari
  click(SettingsPage.leaveOrgButton);
  // click(CommonPage.submitButton);
}

function viewOrgDashboard() {
  waitForElement(OrgDashboardPage.currentOrgName);
  waitForElement(OrgDashboardPage.welcomeMsg);
}

function createAccount() {
  click(CreateAccountPage.createAccountLink);
  setValue(CreateAccountPage.nameInput, name);
  setValue(CreateAccountPage.emailInput, email);
  setValue(CreateAccountPage.organizationInput, organization);
  setValue(CreateAccountPage.passwordInput, password);
  click(CommonPage.submitButton);
}

function assertion(e, data) {
  e.forEach((expected) => {
    expect(expected).to.equal(data);
  });
}

import * as lib from '../../../common';
import CreateAccountPage from 'web/page_objects/createAccountPage';
import HomePage from 'web/page_objects/homePage';
import SignInPage from 'web/page_objects/signInPage';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import SettingsPage from 'web/page_objects/settingsPage';
import Page from 'web/page_objects/page';
import CommonPage from 'web/page_objects/common';
import { openApp, setValue, click, waitForElement } from 'web/actions/actions'
import { getNotificationMessageText } from 'web/actions/common';
import orgNotif from 'web/data/passiveNotification.json';

const name = lib.randomString.generate(10);
const email = `${lib.randomString.generate(15)}@test.co`;
const organization = 'First Org';
const password = 'Pass1234';

const testData = [
  {
    organization: 'Last Org',
    title: 'Create with orgName = Last Org',
    accepted: true
  }];

let accountCreated;
let signedIn;

describe('Delete Organization Test', () => {
  describe('Create Account', () => {
    before('Open App URL', () => {
      SignInPage.open();
    });

    it('Create Account with First Org and Sign In', () => {
      click(CreateAccountPage.createAccountLink);
      setValue(CreateAccountPage.nameInput, name);
      setValue(CreateAccountPage.emailInput, email);
      setValue(CreateAccountPage.organizationInput, organization);
      setValue(CreateAccountPage.passwordInput, password);
      click(CommonPage.submitButton);
    });

    it('Validate user lands in the created Org', () => {
      viewOrgDashboard();
      const currentOrgName = OrgDashboardPage.currentOrgName.getText();
      expect(organization).to.include(currentOrgName);
    });
  });

  describe('Create Last Org', () => {
    testData.forEach((test) => {
      it(` ${test.title}`, () => {
        click(HomePage.profileMenu);
        click(HomePage.switchOrCreateOrganizations);
        click(HomePage.createOrg);
        waitForElement(HomePage.createOrgInput);
        HomePage.createOrgInput.clearElement();
        HomePage.createOrgButton.waitForExist();
        expect(HomePage.createOrgButton.isEnabled()).to.equal(false);
        setValue(HomePage.createOrgInput, test.organization);
        click(HomePage.createOrgButton);
        waitForElement(OrgDashboardPage.welcomeMsg);
      });
    });
  });

  describe('Leaving First Org re-directs to choose org page', () => {
    it('Go back to /organizations and choose First Org', () => {
      viewOrgDashboard();
      browser.url(lib.web + `/organizations`)
      waitForElement(HomePage.chooseOrg);
      click(HomePage.orgCards.value[1]) //selecting First Org
      viewOrgDashboard();
    });

    it('Goto Organization Settings of First Org', () => {
      gotoOrgSettings();
    });

    it('Click Delete Organization - First Org and Confirm OK', () => {
      clickDeleteOrganization();
      expect(getNotificationMessageText()).to.include(orgNotif.deleteOrgMessage.text)
    });

    it('Validate re-direction to choose org page', () => {
      waitForElement(HomePage.chooseOrg);
      waitForElement(HomePage.orgCards);

      const orgCount = [HomePage.orgCards].length;
      expect(orgCount).to.equal(1);
    });

    it('Validate choose org page URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.web}/organizations`);
    });
  });

  describe('Leaving Last Org re-directs to No Orgs page', () => {

    it('Choose Last Org', () => {
      waitForElement(HomePage.chooseOrg);
      click(HomePage.orgCards.value[0]) //selecting Last Org
      viewOrgDashboard();
    });
    it('Goto Organization Settings of Last Org', () => {
      gotoOrgSettings();
    });

    it('Click Delete Organization - Last Org and Confirm OK', () => {
      clickDeleteOrganization();
      expect(getNotificationMessageText()).to.include(orgNotif.deleteOrgMessage.text)
    });

    it('Should re-direct to No Orgs page after leaving the last Org', () => {
      waitForElement(HomePage.noOrgs);
      waitForElement(HomePage.createOrgButton);

      const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled();
      expect(createOrgButtonEnabled).to.equal(true);
    });

    it('Validate URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.web}/organizations`);
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
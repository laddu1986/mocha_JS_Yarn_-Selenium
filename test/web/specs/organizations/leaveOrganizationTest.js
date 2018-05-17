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
const organization = 'First Org';
const password = 'Pass1234';

const testData = [
  {
    organization: 'Second Org',
    title: 'Create with orgName = Second Org',
    accepted: true
  },
  {
    organization: 'Last Org',
    title: 'Create with orgName = Last Org',
    accepted: true
  }];

let accountCreated;
let signedIn;

describe('Leave Organization Test', () => {
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

      console.log('Test Data : - \n' +
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

  describe('Create two more Orgs', () => {
    testData.forEach((test) => {
      it(` ${test.title}`, () => {
        // waitForElement(HomePage.profileMenu);
        // const profileVisibility = HomePage.profileMenu.isVisible();
        // expect(true).to.equal(profileVisibility);
        click(HomePage.profileMenu);

        // waitForElement(HomePage.switchOrCreateOrganizations);
        // const createOrgVisibility = HomePage.switchOrCreateOrganizations.isVisible();
        // expect(true).to.equal(createOrgVisibility);
        click(HomePage.switchOrCreateOrganizations);

        // waitForElement(HomePage.createOrg);
        // const createOrgLink = HomePage.createOrg.isVisible();
        // expect(true).to.equal(createOrgLink);
        click(HomePage.createOrg);

        waitForElement(HomePage.createOrgInput);
        HomePage.createOrgInput.clearElement();

        expect(HomePage.createOrgButton.isEnabled()).to.equal(false);
        setValue(HomePage.createOrgInput, test.organization);

        click(HomePage.createOrgButton);
        waitForElement(OrgDashboardPage.welcomeMsg);
        // console.log(OrgDashboardPage.welcomeMsg.getText())
      });
    });
  });


  describe('Leaving First Org re-directs to choose org page', () => {
    it('Go back to /organizations and choose First Org', () => {
      viewOrgDashboard();
      click(browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Change Organization')]"));
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}/organizations`);
      waitForElement(HomePage.chooseOrg);

      // waitForElement(browser.element("//*[@data-qa='org:card' and contains(@href,'first')]"));
      click(browser.element("//a[@data-qa='org:card' and contains(@href,'first')]"));
      viewOrgDashboard();
    });

    it('Goto Organization Settings of First Org', () => {
      gotoOrgSettings();
    });

    it('Click Leave Organization - First Org', () => {
      clickLeaveOrganization();
    });

    it('Validate re-direction to choose org page', () => {
      waitForElement(HomePage.chooseOrg);
      waitForElement(HomePage.individualOrgCard);

      const orgCount = HomePage.individualOrgCard.getElementSize();
      expect(orgCount.length).to.have.equal(2);
    });

    it('Validate choose org page URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}/organizations`);
    });
  });


  describe('Leaving Second Org re-directs to Last Org', () => {
    it('Choose Second Org', () => {
      waitForElement(HomePage.chooseOrg);
      click(browser.element("//a[@data-qa='org:card' and contains(@href,'second')]"));
    });

    it('Goto Organization Settings of Second Org', () => {
      gotoOrgSettings();
    });

    it('Click Leave Organization - Second Org', () => {
      clickLeaveOrganization();
    });

    it('Validate re-direction to Last Org dashboard', () => {
      viewOrgDashboard();
      expect(OrgDashboardPage.currentOrgName.getText()).to.include('Last Org');
    });
  });

  describe(' Leaving Last Org re-directs to No Orgs page', () => {
    it('Goto Organization Settings of Last Org', () => {
      gotoOrgSettings();
    });

    it('Click Leave Organization - Last Org', () => {
      clickLeaveOrganization();
    });

    it('Should re-direct to No Orgs page after leaving the last Org', () => {
      waitForElement(HomePage.noOrgs);
      waitForElement(HomePage.createOrgButton);

      const createOrgButtonEnabled = HomePage.createOrgButton.isEnabled();
      expect(createOrgButtonEnabled).to.equal(true);
    });

    it('Validate URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.config.api.base}/organizations`);
    });
  });
});

function gotoOrgSettings() {
  // HomePage.profileMenu.waitForExist();
  // HomePage.profileMenu.waitForVisible();
  click(HomePage.profileMenu);
  // OrgDashboardPage.orgSettingsNavMenu.waitForExist();
  //   OrgDashboardPage.orgSettingsNavMenu.waitForVisible();
  click(OrgDashboardPage.orgSettingsNavMenu);
}

function clickLeaveOrganization() {
  // SettingsPage.orgSettingsPage.waitForExist();
  // SettingsPage.orgSettingsPage.waitForVisible();
  click(SettingsPage.orgSettingsPage);

  browser.pause(500); // for safari

  waitForEnabled(SettingsPage.leaveOrgButton);
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

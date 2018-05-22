import * as lib from '../../../common';
import CreateAccountPage from 'web/page_objects/createAccountPage';
import HomePage from 'web/page_objects/homePage';
import SignInPage from 'web/page_objects/signInPage';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import SettingsPage from 'web/page_objects/settingsPage';
import Page from 'web/page_objects/page';
import CommonPage from 'web/page_objects/common';
import { openApp, setValue, click, waitForElement, waitForEnabled } from 'web/actions/actions'
import { getNotificationMessageText, closePassiveNotification } from 'web/actions/common';
import orgNotif from 'web/data/passiveNotification.json';



const name = lib.bigName(10);
const email = `${lib.bigName(15)}@test.co`;
const organization = 'First Org';
const password = 'Pass1234';

const testData = [
  // {
  //   organization: 'Second Org',
  //   title: 'Create with orgName = Second Org',
  //   accepted: true
  // },
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

      console.log(`Test Data : -  \n` +
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

      browser.element("//*[@data-qa='org:card' and contains(@href,'first')]").waitForExist();
      browser.element("//*[@data-qa='org:card' and contains(@href,'first')]").waitForVisible();
      browser.element("//a[@data-qa='org:card' and contains(@href,'first')]").click();
      viewOrgDashboard();
    });

    it('Goto Organization Settings of First Org', () => {
      gotoOrgSettings();
    });

    it('Click Delete Organization - First Org and Confirm OK', () => {
      clickDeleteOrganization();
      expect(getNotificationMessageText()).to.include(orgNotif.deleteOrgMessage.text)
      closePassiveNotification()

    });

    it('Validate re-direction to choose org page', () => {
      waitForElement(HomePage.chooseOrg);
      waitForElement(HomePage.individualOrgCard);

      const orgCount = [HomePage.individualOrgCard].length;
      expect(orgCount).to.equal(1);
    });

    it('Validate choose org page URL to end with /organizations', () => {
      expect(browser.getUrl()).to.equal(`${lib.web}/organizations`);
    });
  });

  describe('Leaving Last Org re-directs to No Orgs page', () => {

    it('Choose Last Org', () => {
      waitForElement(HomePage.chooseOrg);

      browser.element("//*[@data-qa='org:card' and contains(@href,'last')]").waitForExist();
      browser.element("//*[@data-qa='org:card' and contains(@href,'last')]").waitForVisible();
      browser.element("//a[@data-qa='org:card' and contains(@href,'last')]").click();
      viewOrgDashboard();
    });
    it('Goto Organization Settings of Last Org', () => {
      gotoOrgSettings();
    });

    it('Click Delete Organization - Last Org and Confirm OK', () => {
      clickDeleteOrganization();
      expect(getNotificationMessageText()).to.include(orgNotif.deleteOrgMessage.text)
      closePassiveNotification()

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

import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage'
import SignInPage from 'web/page_objects/signInPage'
import SettingsPage from 'web/page_objects/settingsPage'
import CommonPage from 'web/page_objects/common'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'

// pass the orgname parameter from ur test

export function createOrg(orgname) {
  click(HomePage.profileMenu);
  click(HomePage.switchOrCreateOrganizations);
  click(HomePage.createOrg);
  setValue(HomePage.createOrgInput, orgname);
  HomePage.createOrgButton.waitForEnabled();
  click(HomePage.createOrgButton);
  waitForElement(OrgDashboardPage.currentOrgName);
}

export function deleteOrg() {
  click(HomePage.profileMenu);
  click(OrgDashboardPage.orgSettingsNavMenu);
  click(SettingsPage.orgSettingsPage);
  browser.pause(500); // for safari
  waitForEnabled(SettingsPage.leaveOrgButton);
  click(SettingsPage.leaveOrgButton);
  click(CommonPage.submitButton);
}

export function verifyLastOrgDeleted() {
  if (HomePage.noOrgs == HomePage.createOrgButton == HomePage.removeAccountButton == true)
    return true;
}

export function deleteAccount() {
  waitForElement(HomePage.removeAccountButton);
  click(HomePage.removeAccountButton);
  click(CommonPage.submitButton);
  waitForElement(SignInPage.emailInput);
}

import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage'
import SignInPage from 'web/page_objects/signInPage'
import SettingsPage from 'web/page_objects/settingsPage'
import CommonPage from 'web/page_objects/common'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'

export function createOrg(orgname) {
  HomePage.profileMenu.click();
  HomePage.switchOrCreateOrganizations.click();
  HomePage.createOrg.click();
  createNewOrg(orgname);
  OrgDashboardPage.currentOrgName.waitForVisible();
}

export function verifyLastOrgDeleted() {
  if (HomePage.noOrgs.isVisible() == HomePage.createOrgButton.isVisible() == HomePage.removeAccountButton.isVisible() == true)
    return true;
}

export function deleteAccount() {
  HomePage.removeAccountButton.waitForVisible();
  HomePage.removeAccountButton.click();
  CommonPage.submitButton.click();
  SignInPage.emailInput.waitForVisible();
}

export function goToCreateOrgPageFromNavbar() {
  HomePage.profileMenu.click();
  HomePage.switchOrCreateOrganizations.click();
  HomePage.createOrg.click();
}

export function verifyCreateOrgPage() {
  return HomePage.createOrgInput.isVisible();
}

export function createNewOrg(orgName) {
  HomePage.createOrgInput.setValue(orgName);
  HomePage.createOrgButton.waitForEnabled();
  HomePage.createOrgButton.click();
}
export function verifyOrgIsCreated() {
  return OrgDashboardPage.welcomeMsg.isVisible();
}

export function verifyOrgDashBoardAfterLogin() {
  return OrgDashboardPage.currentOrgName.getText();
}

export function gotoOrgSettings() {
  HomePage.profileMenu.click();
  OrgDashboardPage.orgSettingsNavMenu.click();
  SettingsPage.orgSettingsPage.click();
}

export function deleteOrganization() {
  browser.pause(500); // for safari
  SettingsPage.leaveOrgButton.click();
  CommonPage.submitButton.click();
}

export function clickCreateOrgFromNoOrgPage() {
  HomePage.createOrgButton.click();
}

export function verifyChooseOrgspage() {
  const orgCount = [HomePage.orgCards].length;
  if (HomePage.orgCards.isVisible() && orgCount == "1") {
    return true
  } else { return false };
}

export function selectOrg() {
  HomePage.orgCards.value[0].click();
}

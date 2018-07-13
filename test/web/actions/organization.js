import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import SignInPage from 'web/page_objects/signInPage'
import SettingsPage from 'web/page_objects/settingsPage'
import CommonPage from 'web/page_objects/common'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'

export function createOrg(orgname) {
  NavBar.profileMenu.click();
  HomePage.switchOrCreateOrganizations.click();
  HomePage.createOrg.click();
  createNewOrg(orgname);
  OrgDashboardPage.currentOrgName.waitForVisible();
}

export function verifyNoOrgPage() {
  if (HomePage.createOrgButton.isVisible() == HomePage.removeAccountButton.isVisible() == true)
    return true;
}

export function deleteAccount() {
  HomePage.removeAccountButton.waitForVisible();
  HomePage.removeAccountButton.click();
  CommonPage.submitButton.click();
  SignInPage.emailInput.waitForVisible();
}

export function goToCreateOrgPageFromNavbar() {
  NavBar.profileMenu.click();
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

export function verifyOrgNameOnDashBoard() {
  return OrgDashboardPage.currentOrgName.getText();
}

export function gotoOrgSettings() {
  NavBar.profileMenu.click();
  NavBar.orgSettingsAnchor.click()
}

export function deleteOrganization() {
  browser.pause(500);
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

export function isSaveButtonEnabled() {
  return SettingsPage.saveOrgNameButton.isEnabled();
}

export function updateOrgName(updatedOrgName) {
  SettingsPage.orgInput.clearElement();
  SettingsPage.orgInput.setValue(updatedOrgName);
  SettingsPage.saveOrgNameButton.click();
}

export function verifyNewOrgNameInNavbar(updatedOrgName) {
  browser.waitUntil(() => NavBar.backToOrgDashboardLink.getText() === updatedOrgName, 5000, 'Expect orgname to change in the side nav bar', 200);
}

export function goBackToOrgDashboard() {
  NavBar.backToOrgDashboardLink.click();
}

export function verifyOrgCardStack() {
  HomePage.orgCards.waitForVisible();
  return HomePage.orgCards.value[0].getText();
}

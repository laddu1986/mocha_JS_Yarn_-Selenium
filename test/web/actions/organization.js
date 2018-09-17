import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage'
import NavBar from 'web/page_objects/navBar'
import SettingsPage from 'web/page_objects/settingsPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { confirmDelete, cancelDelete, typeDeleteToConfirm } from 'web/actions/common'

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
export function verifyWecomeOrgPage() {
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
  clickDeleteOrgButton()
  typeDeleteToConfirm()
  confirmDelete()
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
  browser.waitUntil(function () {
    return SettingsPage.saveOrgNameButton.isEnabled() === false
  }, 5000, 'Save changes button did not Grey out after saving changes', 200);
}

export function verifyNewOrgNameInNavbar(updatedOrgName) {

  browser.waitUntil(function () {
    return NavBar.backToOrgDashboardLink.getText().includes(updatedOrgName)
  }, 5000, 'New OrgName was not updated in the side Nav Bar', 200);
}

export function goBackToOrgDashboard() {
  NavBar.backToOrgDashboardLink.click();
}

export function verifyOrgCardStack() {
  HomePage.orgCards.waitForVisible();
  return HomePage.orgCards.value[0].getText();
}

export function clickDeleteOrgButton() {
  browser.pause(500);
  SettingsPage.leaveOrgButton.click();
}

export function cancelDeleteOrg() {
  return cancelDelete(SettingsPage.leaveOrgButton)
}
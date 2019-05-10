import '../common';
import HomePage from 'page_objects/homePage';
import NavBar from 'page_objects/navBar';
import SettingsPage from 'page_objects/settingsPage';
import OrgDashboardPage from 'page_objects/orgDashboardPage';
import { confirmDelete, cancelDelete, typeDeleteToConfirm } from 'actions/common';

export function verifyNoOrgPage() {
  if ((HomePage.createOrgButton.isVisible() == HomePage.removeAccountButton.isVisible()) == true) return true;
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

export function verifyOrgNameOnDashBoard(orgName) {
  browser.waitUntil(
    function () {
      return OrgDashboardPage.currentOrgName.getText() === orgName;
    },
    5000,
    'New Org name is not displayed on dashboard',
    200
  );
}

export function gotoOrgSettings() {
  NavBar.profileMenu.click();
  NavBar.orgSettingsAnchor.click();
  NavBar.general.click();
}

export function deleteOrganization() {
  clickDeleteOrgButton();
  typeDeleteToConfirm();
  confirmDelete();
}

export function clickCreateOrgFromNoOrgPage() {
  HomePage.createOrgButton.click();
}

export function verifyChooseOrgspage() {
  const orgCount = [HomePage.orgCards].length;
  if (HomePage.orgCards.isVisible() && orgCount == '1') {
    return true;
  } else {
    return false;
  }
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
  browser.waitUntil(
    function () {
      return SettingsPage.saveOrgNameButton.isEnabled() === false;
    },
    5000,
    'Save changes button did not Grey out after saving changes',
    200
  );
}

export function goBackToOrgDashboard() {
  NavBar.backToOrgDashboardLink.click();
}

export function verifyOrgCardStack(updatedOrgName) {
  HomePage.orgCards.waitForVisible();
  browser.refresh();
  browser.waitUntil(
    function () {
      return HomePage.orgCards.value[0].getText().includes(updatedOrgName);
    },
    5000,
    'Organisation name did not update to new name',
    200
  );
}

export function clickDeleteOrgButton() {
  browser.pause(500);
  SettingsPage.leaveOrgButton.click();
}

export function cancelDeleteOrg() {
  return cancelDelete(SettingsPage.leaveOrgButton);
}

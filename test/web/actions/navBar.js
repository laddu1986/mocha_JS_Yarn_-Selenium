import '../common';
import CommonPage from 'page_objects/common';
import NavBar from 'page_objects/navBar';

export function signOut() {
  browser.pause(200); // can be removed after AD-383 is resolved
  NavBar.profileMenu.click();
  NavBar.signOut.click();
  CommonPage.submitButton.waitForVisible();
}

export function verifySignOut() {
  return CommonPage.submitButton.isVisible();
}

export function getnavOrgCount() {
  return NavBar.navOrgs.value.length - 1;
}

export function backToSpaceDashboard() {
  return NavBar.backToSpaceDashboardLink.click();
}

export function clickOnAudienceLink() {
  NavBar.audienceLink.click();
}

export function clickOnSpaceDashboardLink() {
  NavBar.spaceDashboard.click();
}

export function verifySelectedOrgMenu() {
  browser.pause(1000);
  NavBar.profileMenu.click();
  NavBar.selectedOrg.waitForVisible();
  return NavBar.selectedOrg.getText();
}

export function goToOrgPageFromNavMenu() {
  NavBar.selectedOrg.click();
  NavBar.firstOrg.click();
}

export function goToExperiencePage() {
  NavBar.experienceMenu.click();
}

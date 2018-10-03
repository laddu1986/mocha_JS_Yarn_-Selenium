import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import SpaceDevelopersPage from 'web/page_objects/spaceDevelopersPage';
import SpaceSettingsPage from 'web/page_objects/spaceSettingsPage';
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';
import HomePage from 'web/page_objects/homePage';
import CommonPage from 'web/page_objects/common';
import NavBar from 'web/page_objects/navBar';
import { confirmDelete, cancelDelete, typeDeleteToConfirm } from 'web/actions/common';

const clipboardy = require('clipboardy');

export function changeSpace(type) {
  var webElement = SpaceSettingsPage.spaceName;
  var name = `${lib.randomString.generate(8)}_Space`;
  if (type == 'slug') {
    webElement = SpaceSettingsPage.spaceSlug;
    name = `${lib.randomString.generate(8)}_Slug`;
  }
  webElement.setValue(name);
  CommonPage.submitButton.click();
  return name;
}

export function verifyNewSpaceName() {
  HomePage.logo.click();
  return OrgDashboardPage.spaceCards.getText();
}

export function spaceIsDeleted() {
  return OrgDashboardPage.createSpaceInput.waitForVisible();
}

export function createSpace() {
  var spacename = `${lib.randomString.generate(8)}_Space`;
  OrgDashboardPage.createSpaceInput.setValue(spacename);
  OrgDashboardPage.createSpaceButton.click();
  NavBar.developerLink.waitForVisible();
  return spacename;
}

export function goToDeveloperPortal() {
  NavBar.developerLink.click();
}

export function verifySpacePage(spaceName) {
  if (NavBar.developerLink.isVisible() === true && browser.getUrl().includes(spaceName)) {
    return true;
  } else {
    return false;
  }
}

export function clickCreateNewSpaceButton() {
  OrgDashboardPage.createNewSpaceButton.click();
}

export function goBackToOrgDashboard() {
  HomePage.logo.click();
  OrgDashboardPage.spaceCards.waitForVisible();
}

export function verifyCreateFirstSpacePage() {
  if (
    OrgDashboardPage.createSpaceButton.isEnabled() == false &&
    OrgDashboardPage.createSpaceInput.isVisible() == true
  ) {
    return OrgDashboardPage.createYourFirstSpaceLabel.getText().includes('Create your first Space');
  } else {
    return false;
  }
}

export function copyAPIKeyToClipBoard() {
  SpaceDashboardPage.cURLcopyButton.click();
  CommonPage.dismissNotification.click();
}

export function copiedAPIKeyValue() {
  var copiedValue = clipboardy
    .readSync()
    .split('{')
    .pop()
    .split('}')
    .shift();
  return copiedValue.replace(/"/g, '').split(':')[1];
}

export function getAPIKey() {
  return SpaceDevelopersPage.APIKeyData.getText()
    .split('{')
    .pop()
    .split('}')
    .shift()
    .replace(/"/g, '')
    .split(':')[1];
}

export function verifyNewSpaceUrl(newSlugName) {
  return browser.waitUntil(
    function() {
      return browser.getUrl().includes(newSlugName.toLowerCase());
    },
    5000,
    `New Slug ${newSlugName} is not updated`
  );
}

export function verifySpaceOrder(index) {
  return OrgDashboardPage.spaceCards.value[index].getText();
}

export function selectSpace() {
  OrgDashboardPage.spaceCards.value[0].click();
}
export function goToSpaceSettings() {
  NavBar.spaceSettings.click();
}

export function verifySpaceCard() {
  return OrgDashboardPage.spaceCards.isVisible();
}

export function deleteSpace() {
  clickDeleteSpaceButton();
  typeDeleteToConfirm();
  confirmDelete();
}

export function clickDeleteSpaceButton() {
  SpaceSettingsPage.deleteSpaceButton.click();
}

export function cancelDeleteSpace() {
  return cancelDelete(SpaceSettingsPage.deleteSpaceButton);
}

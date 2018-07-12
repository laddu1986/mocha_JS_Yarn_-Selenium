const copyPasteModule = require('copy-paste');
import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import SpaceSettingsPage from 'web/page_objects/spaceSettingsPage';
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';
import HomePage from 'web/page_objects/homePage';
import CommonPage from 'web/page_objects/common';
import NavBar from 'web/page_objects/navBar';

export function changeSpace(type) {
  var webElement = SpaceSettingsPage.spaceName;
  var name = `${lib.randomString.generate(8)}_Space`;
  if (type == "slug") {
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

export function deleteSpace() {
  SpaceSettingsPage.deleteSpaceButton.click();
  CommonPage.iAmSureButton.click();
}

export function spaceIsDeleted() {
  return OrgDashboardPage.createSpaceInput.isVisible();
}

export function createSpace() {
  var spacename = `${lib.randomString.generate(8)}_Space`;
  OrgDashboardPage.createSpaceInput.setValue(spacename);
  OrgDashboardPage.createSpaceButton.click();
  SpaceDashboardPage.goToAppSettings.waitForVisible();
  return spacename;
}

export function goToAPIKeyPage() {
  SpaceDashboardPage.goToAppSettings.click();
  SpaceAPIKeyPage.devApiGuideButton.waitForVisible();
}

export function verifySpacePage(spaceName) {
  if (SpaceDashboardPage.goToAppSettings.isVisible() == true && browser.getUrl().includes(spaceName)) {
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
  if (OrgDashboardPage.createSpaceButton.isEnabled() == false && OrgDashboardPage.createSpaceInput.isVisible() == true) {
    return OrgDashboardPage.createYourFirstSpaceLabel.getText().includes('Create your first Space');
  } else {
    return false;
  }
}

export function copyAPIKeyToClipBoard() {
  SpaceAPIKeyPage.copyToClipboard.click();
}

export function copiedValue() {
  var copiedValue = copyPasteModule.paste();
  return copiedValue;
}

export function defaultAPIKey() {
  return SpaceAPIKeyPage.APIKey.getText();
}

export function verifyAPIKeyStatus(status) {
  return browser.waitUntil(function () {
    return SpaceAPIKeyPage.APIKeyStatus.getText() === status
  }, 5000, `Api Key status is not+${status}`);
}

export function verifyNewSpaceUrl(newSlugName) {
  return browser.waitUntil(function () {
    return browser.getUrl().includes(newSlugName)
  }, 5000, `New Slug ${newSlugName} is not updated`);
}

export function clickRevokeButton() {
  SpaceAPIKeyPage.revokeButton.click();
}

export function clickUndoButton() {
  SpaceAPIKeyPage.undoButton.click();
}

export function deleteAPIKey() {
  SpaceAPIKeyPage.deleteButton.click();
  CommonPage.submitButton.click();
}

export function ifIconsEnabled() {
  if (SpaceAPIKeyPage.deleteButton.isEnabled() === false && SpaceAPIKeyPage.undoButton.isEnabled() === false) {
    return false;
  }
}

export function revokeButtonAppears() {
  return SpaceAPIKeyPage.revokeButton.isVisible();
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

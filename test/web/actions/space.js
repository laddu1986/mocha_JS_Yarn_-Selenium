const copyPasteModule = require('copy-paste');
import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import SpaceSettingsPage from 'web/page_objects/SpaceSettingsPage';
import SpaceDashboardPage from 'web/page_objects/SpaceDashboardPage';
import HomePage from 'web/page_objects/homePage';
import CommonPage from 'web/page_objects/common';

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
  SpaceSettingsPage.imSureButton.click();
}

export function spaceIsDeleted() {
  return OrgDashboardPage.createSpaceInput.isVisible();
}
function createSpace() {
  OrgDashboardPage.createSpaceInput.setValue(`${lib.randomString.generate(8)}_Space`);
  OrgDashboardPage.createSpaceButton.click();
  SpaceDashboardPage.goToAppSettings.waitForVisible();
}

export function goToAPIKeyPage() {
  SpaceDashboardPage.goToAppSettings.click();
  SpaceAPIKeyPage.devApiGuideButton.waitForVisible();
}

function verifySpace() {
  return SpaceDashboardPage.goToAppSettings.isVisible();
}

function clickCreateNewSpaceButton() {
  OrgDashboardPage.createNewSpaceButton.click();
}

function goBackToOrgDashboard() {
  HomePage.logo.click();
  OrgDashboardPage.spaceCards.waitForVisible();
}

function createSpaceButtonEnabled() {
  return OrgDashboardPage.createSpaceButton.isEnabled();
}

function copyAPIKeyToClipBoard() {
  SpaceAPIKeyPage.copyToClipboard.click();
}

function copiedValue() {
  var copiedValue = copyPasteModule.paste();
  return copiedValue;
}

function defaultAPIKey() {
  return SpaceAPIKeyPage.APIKey.getText();
}

function verifyAPIKeyStatus(status) {
  return browser.waitUntil(function () {
    return SpaceAPIKeyPage.APIKeyStatus.getText() === status
  }, 5000, `Api Key status is not+${status}`);
}

export function verifyNewSpaceUrl(newSlugName) {
  return browser.waitUntil(function () {
    return browser.getUrl().includes(newSlugName)
  }, 5000, `New Slug ${newSlugName} is not updated`);
}

function clickRevokeButton() {
  SpaceAPIKeyPage.revokeButton.click();
}

function clickUndoButton() {
  SpaceAPIKeyPage.undoButton.click();
}

function deleteAPIKey() {
  SpaceAPIKeyPage.deleteButton.click();
  CommonPage.submitButton.click();
}

function ifIconsEnabled() {
  if (SpaceAPIKeyPage.deleteButton.isEnabled() === false && SpaceAPIKeyPage.undoButton.isEnabled() === false) {
    return false;
  }
}

function revokeButtonAppears() {
  return SpaceAPIKeyPage.revokeButton.isVisible();
}

export { revokeButtonAppears, ifIconsEnabled, deleteAPIKey, clickUndoButton, clickRevokeButton, verifyAPIKeyStatus, goBackToOrgDashboard, defaultAPIKey, copiedValue, createSpace, verifySpace, clickCreateNewSpaceButton, createSpaceButtonEnabled, copyAPIKeyToClipBoard }

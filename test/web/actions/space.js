import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { ifEnabled, setValue, click, waitForElement } from 'web/actions/actions'
import SpaceAPIKeyPage from 'web/page_objects/spaceAPIKeyPage';
import SpaceSettingsPage from 'web/page_objects/SpaceSettingsPage';
import SpaceDashboardPage from 'web/page_objects/SpaceDashboardPage';
const copyPasteModule = require('copy-paste');
import HomePage from 'web/page_objects/homePage';
import CommonPage from 'web/page_objects/common';

export function changeSpace(type) {
  var webElement = SpaceSettingsPage.spaceName;
  var name = `${lib.randomString.generate(8)}_Space`;
  if (type == "slug") {
    webElement = SpaceSettingsPage.spaceSlug;
    name = `${lib.randomString.generate(8)}_Slug`;
  }
  setValue(webElement, name);
  click(CommonPage.submitButton);
  return name;
}

export function verifyNewSpaceName() {
  click(HomePage.logo);
  return OrgDashboardPage.spaceCards.getText();
}

export function deleteSpace() {
  click(SpaceSettingsPage.deleteSpaceButton);
  click(SpaceSettingsPage.imSureButton);
}

export function spaceIsDeleted() {
  return OrgDashboardPage.createSpaceInput.isVisible();
}
function createSpace() {
  setValue(OrgDashboardPage.createSpaceInput, `${lib.randomString.generate(8)}_Space`);
  click(OrgDashboardPage.createSpaceButton);
  waitForElement(SpaceDashboardPage.goToAppSettings);
}

export function goToAPIKeyPage() {
  click(SpaceDashboardPage.goToAppSettings);
  waitForElement(SpaceAPIKeyPage.devApiGuideButton);
}

function verifySpace() {
  return SpaceDashboardPage.goToAppSettings.isVisible();
}

function clickCreateNewSpaceButton() {
  click(OrgDashboardPage.createNewSpaceButton);
}

function goBackToOrgDashboard() {
  click(HomePage.logo);
  waitForElement(OrgDashboardPage.spaceCards);
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
  click(SpaceAPIKeyPage.revokeButton);
}

function clickUndoButton() {
  click(SpaceAPIKeyPage.undoButton);
}

function deleteAPIKey() {
  click(SpaceAPIKeyPage.deleteButton);
  click(CommonPage.submitButton);
}

function ifIconsEnabled() {
  if (ifEnabled(SpaceAPIKeyPage.deleteButton) === false && ifEnabled(SpaceAPIKeyPage.undoButton) === false) {
    return false;
  }
}

function revokeButtonAppears() {
  return SpaceAPIKeyPage.revokeButton.isVisible();
}

export { revokeButtonAppears, ifIconsEnabled, deleteAPIKey, clickUndoButton, clickRevokeButton, verifyAPIKeyStatus, goBackToOrgDashboard, defaultAPIKey, copiedValue, createSpace, verifySpace, clickCreateNewSpaceButton, createSpaceButtonEnabled, copyAPIKeyToClipBoard }

import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { setValue, click, waitForElement } from 'web/actions/actions'
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';
import SpaceSettingsPage from 'web/page_objects/SpaceSettingsPage';
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
  waitForElement(SpaceDashboardPage.devApiGuideButton);
}

function verifySpace() {
  return SpaceDashboardPage.devApiGuideButton.isVisible();
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
  SpaceDashboardPage.copyToClipboard.click();
}

function copiedValue() {
  var copiedValue = copyPasteModule.paste();
  return copiedValue;
}

function defaultAPIKey() {
  return SpaceDashboardPage.APIKey.getText();
}

function verifyAPIKeyStatus(status) {
  return browser.waitUntil(function () {
    return SpaceDashboardPage.APIKeyStatus.getText() === status
  }, 5000, `Api Key status is not+${status}`);
}

export function verifyNewSpaceUrl(newSlugName) {
  return browser.waitUntil(function () {
    return browser.getUrl().includes(newSlugName)
  }, 5000, `New Slug ${newSlugName} is not updated`);
}

function clickRevokeButton() {
  click(SpaceDashboardPage.revokeButton);
}

function clickUndoButton() {
  click(SpaceDashboardPage.undoButton);
}

function deleteAPIKey() {
  click(SpaceDashboardPage.deleteButton);
  click(CommonPage.submitButton);
}

function ifIconsEnabled() {
  if ((SpaceDashboardPage.deleteButton.isEnabled()) === false && (SpaceDashboardPage.undoButton.isEnabled()) === false) {
    return false;
  }
}

function revokeButtonAppears() {
  return SpaceDashboardPage.revokeButton.isVisible();
}

export { revokeButtonAppears, ifIconsEnabled, deleteAPIKey, clickUndoButton, clickRevokeButton, verifyAPIKeyStatus, goBackToOrgDashboard, defaultAPIKey, copiedValue, createSpace, verifySpace, clickCreateNewSpaceButton, createSpaceButtonEnabled, copyAPIKeyToClipBoard }

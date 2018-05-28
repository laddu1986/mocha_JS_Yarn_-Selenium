import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { setValue, click, waitForElement } from 'web/actions/actions'
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';
const copyPasteModule = require('copy-paste');
import HomePage from 'web/page_objects/homePage';
import CommonPage from 'web/page_objects/common';

function createSpace() {
  setValue(OrgDashboardPage.createSpaceInput, `${lib.bigName(8)}_Space`);
  click(OrgDashboardPage.createSpaceButton);
}

function verifySpace() {
  waitForElement(SpaceDashboardPage.devApiGuideButton);
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

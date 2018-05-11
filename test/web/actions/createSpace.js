import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions';
import * as lib from '../../common';
import SpaceDashboardPage from '../page_objects/spaceDashboardPage';
const copyPasteModule = require('copy-paste');

function createSpace() {
  setValue(OrgDashboardPage.createSpaceInput, lib.testData.space);
  click(OrgDashboardPage.createSpaceButton);
}

function verifySpace() {
  waitForElement(SpaceDashboardPage.devApiGuideButton);
  return SpaceDashboardPage.devApiGuideButton.isVisible();
}

function clickCreateNewSpaceButton() {
  click(OrgDashboardPage.createNewSpaceButton);
}

function goBackToSpacesPage() {
  const goBackToOrg = (lib.config.api.base + '/' + lib.testData.organization).toLowerCase() + '/';
  browser.url(goBackToOrg); //Temporary - will change when we have a "Go Back to OrgDashBoard" link in the space page
  waitForElement(OrgDashboardPage.spaceCards);
}

function createSpaceButtonEnabled() {
  return OrgDashboardPage.createSpaceButton.isEnabled();
}

function copyAPIKeyToClipBoard() {
  SpaceDashboardPage.copyToClipboard.click();
}

function copyToastMessage() {
  waitForElement(SpaceDashboardPage.successMsg);
  return SpaceDashboardPage.successMsg.getText();
}

function copiedValue() {
  var copiedValue = copyPasteModule.paste();
  return copiedValue;
}

function defaultAPIKey() {
  return SpaceDashboardPage.APIKey.getText();
}

export { goBackToSpacesPage, defaultAPIKey, copiedValue, createSpace, verifySpace, clickCreateNewSpaceButton, createSpaceButtonEnabled, copyAPIKeyToClipBoard, copyToastMessage }

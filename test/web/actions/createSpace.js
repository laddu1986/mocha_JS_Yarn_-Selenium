import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions';
import * as lib from '../../common';
import SpaceDashboardPage from '../page_objects/spaceDashboardPage';
import homePage from '../page_objects/homePage';
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

function goBackToOrgDashboard() {
  click(homePage.logo);
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

export { goBackToOrgDashboard, defaultAPIKey, copiedValue, createSpace, verifySpace, clickCreateNewSpaceButton, createSpaceButtonEnabled, copyAPIKeyToClipBoard }

import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions';
import * as lib from '../../common';
import SpaceDashboardPage from '../page_objects/spaceDashboardPage';


function createFirstSpace() {
  setValue(OrgDashboardPage.createSpaceInput, lib.testData.space);
  click(OrgDashboardPage.createSpaceButton);
  waitForElement(SpaceDashboardPage.devApiGuideButton);
}

function createAnotherSpace() {
  click(OrgDashboardPage.createNewSpaceButton);
  createFirstSpace();
}

export { createFirstSpace, createAnotherSpace };

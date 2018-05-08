import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';


function createFirstSpace() {
  setValue(OrgDashboardPage.createSpaceInput, lib.testData.space)
  click(OrgDashboardPage.createSpaceButton)
  waitForElement(SpaceDashboardPage.devApiGuideButton)
}

function createAnotherSpace() {
  click(OrgDashboardPage.createNewSpaceButton)
  createFirstSpace()
}

export { createFirstSpace, createAnotherSpace }

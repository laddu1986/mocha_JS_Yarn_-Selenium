import OrgDashboardPage from '../page_objects/orgDashboardPage'
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as lib from '../../common';


const space = lib.bigName(14);

function createSpace() {
  setValue(OrgDashboardPage.createNewSpaceInput, space)
  click(OrgDashboardPage.createNewSpaceButton)
}

export { createSpace }

import HomePage from '../page_objects/homePage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as lib from '../../common';

// pass the orgname parameter from ur test



function createOrg(orgname) {

  click(HomePage.profileMenu);
  click(HomePage.switchOrCreateOrganizations);

  click(HomePage.createOrg);

  setValue(HomePage.createOrgInput, orgname);
  HomePage.createOrgButton.waitForEnabled();
  click(HomePage.createOrgButton);
  waitForElement(OrgDashboardPage.currentOrgName)

}

export { createOrg }


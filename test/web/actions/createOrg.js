import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'

// pass the orgname parameter from ur test
function createOrg(orgname) {

  click(HomePage.profileMenu);
  click(HomePage.switchOrCreateOrganizations);

  click(HomePage.createOrg);

  setValue(HomePage.createOrgInput, orgname);
  click(HomePage.createOrgButton);
  waitForElement(OrgDashboardPage.currentOrgName);

}

export { createOrg }
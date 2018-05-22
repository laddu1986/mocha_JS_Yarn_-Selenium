import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/createAccountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'



function createAccount() {
  click(CreateAccountPage.createAccountLink);

  setValue(CreateAccountPage.nameInput, lib.testData.name);
  setValue(CreateAccountPage.emailInput, lib.testData.email);
  setValue(CreateAccountPage.organizationInput, lib.testData.organization);
  setValue(CreateAccountPage.passwordInput, lib.testData.password);

  click(CommonPage.submitButton);
  waitForElement(HomePage.logo);
  waitForElement(OrgDashboardPage.currentOrgName);
}

export { createAccount }

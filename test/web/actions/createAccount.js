import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/createAccountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'

// const name = lib.bigName(10);
// const email = lib.bigName(15) + `@test.co`;
// const organization = lib.bigName(14);
// const password = 'Pass1234'

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

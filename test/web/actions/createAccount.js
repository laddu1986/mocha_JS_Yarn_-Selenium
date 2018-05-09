import HomePage from '../page_objects/homePage';
import CreateAccountPage from '../page_objects/createAccountPage';
import OrgDashboardPage from '../page_objects/orgDashboardPage';
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions';
import * as lib from '../../common';


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

  click(CreateAccountPage.createAccountButton);
  waitForElement(HomePage.logo);
  waitForElement(OrgDashboardPage.currentOrgName);
}

export { createAccount };


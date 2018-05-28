import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/createAccountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'

function createAccount() {
  click(CreateAccountPage.createAccountLink);
  setValue(CreateAccountPage.nameInput, lib.randomString.generate(8));
  setValue(CreateAccountPage.emailInput, `${lib.randomString.generate(10)}@test.co`);
  setValue(CreateAccountPage.organizationInput, `${lib.randomString.generate(10)}_Org`);
  setValue(CreateAccountPage.passwordInput, 'Pass1234');
  click(CommonPage.submitButton);
  waitForElement(HomePage.logo);
  waitForElement(OrgDashboardPage.currentOrgName);
}

export function clickCreateAccountLink() {
  click(CreateAccountPage.createAccountLink);
}

export function verifyCreateAccountPageAppears() {
  return CreateAccountPage.nameInput.isVisible();
}

export function inputDetails() {
  setValue(CreateAccountPage.nameInput, lib.randomString.generate(10));
  setValue(CreateAccountPage.emailInput, `${lib.randomString.generate(15)}@test.co`);
  setValue(CreateAccountPage.organizationInput, `${lib.randomString.generate(10)}_Org`);
  setValue(CreateAccountPage.passwordInput, 'Pass1234');
}

export function submit() {
  click(CommonPage.submitButton);
}

export function verifyOrgDashboardPageAppears() {
  if ((HomePage.logo).isVisible() == true & (OrgDashboardPage.currentOrgName).isVisible() == true) {
    return true;
  } else {
    return false;
  }
}

export { createAccount }

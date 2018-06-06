import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/createAccountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { setValue, click, waitForElement } from 'web/actions/actions'

let name = lib.randomString.generate({
  length: 6, charset: 'alphabetic'
}) + ' ' + lib.randomString.generate({
  length: 8, charset: 'alphabetic'
})
  ,//firstName + space + lastName

  organization = `${lib.randomString.generate(10)} TestOrg`,
  email = `${lib.randomString.generate(10)}@test.co`,
  password = `Pass1234`


function createAccount() {
  click(CreateAccountPage.createAccountLink);
  setValue(CreateAccountPage.nameInput, name);
  setValue(CreateAccountPage.emailInput, email);
  setValue(CreateAccountPage.organizationInput, organization);
  setValue(CreateAccountPage.passwordInput, password);
  click(CommonPage.submitButton);

  waitForElement(HomePage.logo);
  waitForElement(OrgDashboardPage.currentOrgName);
  verifyOrgDashboardPageAppears()
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

export { createAccount, name, organization, email, password }


import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/accountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
var name, email, organization, accountData = { name, email, organization };

export function createAccount(email) {
  clickCreateAccountLink();
  inputDetails(email);
  submit();
  HomePage.logo.waitForVisible();
  OrgDashboardPage.currentOrgName.waitForVisible();
  return accountData;
}

export function clickCreateAccountLink() {
  CreateAccountPage.createAccountLink.click();
}

export function verifyCreateAccountPageAppears() {
  return CreateAccountPage.nameInput.isVisible();
}

export function inputDetails(email) {
  accountData.name = lib.randomString.generate(8);
  accountData.organization = `${lib.randomString.generate(10)}_Org`;
  CreateAccountPage.nameInput.setValue(accountData.name);
  CreateAccountPage.organizationInput.setValue(accountData.organization);
  CreateAccountPage.passwordInput.setValue('Pass1234');
  if (email != undefined) {
    CreateAccountPage.emailInput.setValue(email);
    accountData.email = email;
  } else {
    accountData.email = `${lib.randomString.generate(15)}@test.co`
    CreateAccountPage.emailInput.setValue(accountData.email);
  }
}

export function submit() {
  CommonPage.submitButton.click();
}

export function verifyOrgDashboardPageAppears() {
  if ((HomePage.logo).isVisible() == true & (OrgDashboardPage.currentOrgName).isVisible() == true) {
    return true;
  } else {
    return false;
  }
}


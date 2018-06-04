import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/accountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'
var name, email, organization, accountData = { name, email, organization };

export function createAccount(email) {
  clickCreateAccountLink();
  inputDetails(email);
  submit();
  waitForElement(HomePage.logo);
  waitForElement(OrgDashboardPage.currentOrgName);
  return accountData;
}

export function clickCreateAccountLink() {
  click(CreateAccountPage.createAccountLink);
}

export function verifyCreateAccountPageAppears() {
  return CreateAccountPage.nameInput.isVisible();
}

export function inputDetails(email) {
  accountData.name = lib.randomString.generate(8);
  accountData.organization = `${lib.randomString.generate(10)}_Org`;
  setValue(CreateAccountPage.nameInput, accountData.name);
  setValue(CreateAccountPage.organizationInput, accountData.organization);
  setValue(CreateAccountPage.passwordInput, 'Pass1234');
  if (email != undefined) {
    setValue(CreateAccountPage.emailInput, email);
    accountData.email = email;
  } else {
    accountData.email = `${lib.randomString.generate(15)}@test.co`
    setValue(CreateAccountPage.emailInput, accountData.email);
  }
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


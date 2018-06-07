import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import AccountPage from 'web/page_objects/accountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'

const password = 'Pass1234'
var name, email, organization, accountData = { name, email, organization, password };

export function createAccount(email) {
  clickCreateAccountLink();
  inputDetails(email);
  submit();
  HomePage.logo.waitForVisible();
  OrgDashboardPage.currentOrgName.waitForVisible();
  return accountData;
}

export function clickCreateAccountLink() {
  AccountPage.createAccountLink.click();
}

export function verifyAccountPageAppears() {
  return AccountPage.nameInput.isVisible();
}

export function inputDetails(email) {
  accountData.name = lib.randomString.generate(8);
  accountData.organization = `${lib.randomString.generate(10)}_Org`;
  AccountPage.nameInput.setValue(accountData.name);
  if (email != undefined) {
    AccountPage.emailInput.setValue(email);
    accountData.email = email;
  } else {
    accountData.email = `${lib.randomString.generate(15)}@test.co`
    AccountPage.emailInput.setValue(accountData.email);
  }
  AccountPage.organizationInput.setValue(accountData.organization);
  AccountPage.passwordInput.setValue(password);
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


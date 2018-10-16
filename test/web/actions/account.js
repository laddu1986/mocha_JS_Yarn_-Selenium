import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import AccountPage from 'web/page_objects/accountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { confirmDelete, cancelDelete, typeDeleteToConfirm, hideIntercom } from 'web/actions/common'
var name, email, organization, password, invcode, accountData = { name, email, invcode, organization, password, invcode };

export function createAccount(email) {
  inputDetails(email);
  submit();
  HomePage.logo.waitForVisible();
  OrgDashboardPage.currentOrgName.waitForVisible();
  hideIntercom()
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
  accountData.password = process.env.ACCOUNT_PASS;
  accountData.invcode = process.env.INV_CODE;
  AccountPage.nameInput.setValue(accountData.name);
  if (email != undefined) {
    AccountPage.emailInput.setValue(email);
    accountData.email = email;
  } else {
    accountData.email = `${lib.randomString.generate(15)}@test.co`
    AccountPage.emailInput.setValue(accountData.email);
  }
  AccountPage.organizationInput.setValue(accountData.organization);
  AccountPage.passwordInput.setValue(accountData.password);
  AccountPage.codeInput.setValue(accountData.invcode);
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

export function joinOrgText() {
  return AccountPage.joinOrgMsg.getText();
}

export function createAccountToJoinInvitedOrg() {
  AccountPage.nameInput.setValue(`newUser_${accountData.name}`)
  AccountPage.passwordInput.setValue(accountData.password)
  AccountPage.codeInput.setValue(accountData.invcode);
  CommonPage.submitButton.click()
  OrgDashboardPage.currentOrgName.waitForVisible();
}

export function deleteAccount() {
  clickDeleteAccButton()
  typeDeleteToConfirm()
  confirmDelete()
}

export function clickDeleteAccButton() {
  HomePage.removeAccountButton.waitForVisible();
  HomePage.removeAccountButton.click();
}

export function cancelDeleteAccount() {
  return cancelDelete(HomePage.removeAccountButton)
}

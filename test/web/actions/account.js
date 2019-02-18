import * as lib from '../common';
import HomePage from 'page_objects/homePage';
import AccountPage from 'page_objects/accountPage';
import OrgDashboardPage from 'page_objects/orgDashboardPage';
import CommonPage from 'page_objects/common';
import NavBarPage from 'page_objects/navBar';
import { confirmDelete, cancelDelete, typeDeleteToConfirm, hideIntercom } from 'actions/common';
var name,
  email,
  organization,
  password,
  invcode,
  accountData = { name, email, invcode, organization, password };

export function createAccount(email) {
  inputDetails(email);
  submit();
  OrgDashboardPage.currentOrgName.waitForVisible();
  hideIntercom();
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
    if (!AccountPage.emailInput.getAttribute('value').includes('@')) {
      accountData.email = `${lib.randomString.generate(15)}@test.co`;
      AccountPage.emailInput.setValue(accountData.email);
    }
  }
  AccountPage.organizationInput.setValue(accountData.organization);
  AccountPage.passwordInput.setValue(accountData.password);
  AccountPage.codeInput.setValue(accountData.invcode);
}

export function submit() {
  CommonPage.submitButton.click();
}

export function verifyOrgDashboardPageAppears() {
  if ((NavBarPage.backToOrgDashboardLink.isVisible() == true) & (OrgDashboardPage.currentOrgName.isVisible() == true)) {
    return true;
  } else {
    return false;
  }
}

export function verifyJoinOrgText(text) {
  browser.waitUntil(() => AccountPage.joinOrgMsg.getText().includes(text), 5000, 'Join org text is not correct', 200);
}

export function createAccountToJoinInvitedOrg() {
  AccountPage.nameInput.setValue(`newUser_${lib.randomString.generate(8)}`);
  AccountPage.passwordInput.setValue(process.env.ACCOUNT_PASS);
  AccountPage.codeInput.setValue(process.env.INV_CODE);
  CommonPage.submitButton.click();
  OrgDashboardPage.currentOrgName.waitForVisible();
}

export function deleteAccount() {
  clickDeleteAccButton();
  typeDeleteToConfirm();
  confirmDelete();
}

export function clickDeleteAccButton() {
  HomePage.removeAccountButton.waitForVisible();
  HomePage.removeAccountButton.click();
}

export function cancelDeleteAccount() {
  return cancelDelete(HomePage.removeAccountButton);
}

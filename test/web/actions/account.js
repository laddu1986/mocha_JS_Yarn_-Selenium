import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import AccountPage from 'web/page_objects/accountPage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import CommonPage from 'web/page_objects/common'
import { confirmDelete, cancelDelete, typeDeleteToConfirm } from 'web/actions/common'

var name, email, organization, password, accountData = { name, email, organization, password };

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
  accountData.password = 'Pass1234';
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
  CommonPage.submitButton.click()
  OrgDashboardPage.currentOrgName.waitForVisible();
}


// export function deleteAccount(flag) {
//   if (flag == false) {
//     HomePage.removeAccountButton.waitForVisible();
//     HomePage.removeAccountButton.click();
//     cancelDelete()
//   } else {
//     HomePage.removeAccountButton.waitForVisible();
//     HomePage.removeAccountButton.click();
//     confirmDelete()
//     SignInPage.emailInput.waitForVisible();
//   }
// }


export function deleteAccount(flag) {
  if (flag === undefined) {
    clickDeleteAccButton()
    typeDeleteToConfirm()
    confirmDelete()
  } else {
    return cancelDelete(HomePage.removeAccountButton)
  }
}

export function clickDeleteAccButton() {
  HomePage.removeAccountButton.waitForVisible();
  HomePage.removeAccountButton.click();
}

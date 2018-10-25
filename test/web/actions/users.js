import * as lib from '../common';
import UsersPage from 'page_objects/usersPage';
import CommonPage from 'page_objects/common';
import Constants from 'constants.json';
import { clickOnAudienceLink } from 'actions/navBar';

var flag,
  finalFlag = [],
  i = 0;

export function clickOnUsersTab() {
  UsersPage.usersTab.click();
}

export function getRecentUsersRows() {
  return UsersPage.userRows.value.length;
}

export function gotoUsersTab() {
  clickOnAudienceLink();
  clickOnUsersTab();
}

export function verifyUsersDetails(dataArray) {
  //iterates thru the rows and verifies all users are shown on users page.
  dataArray.forEach(element => {
    finalFlag.push(flag);
    flag = false;
    while (dataArray.length != i) {
      if (
        element.uid == UsersPage.userUIDRow.value[i].getText() &&
        element.e[0].fields.email == UsersPage.userEmailRow.value[i].getText() &&
        element.e[0].fields.displayName == UsersPage.userNameRow.value[i].getText()
      ) {
        i = 0;
        return (flag = true);
      } else {
        i++;
      }
    }
  });
  if (finalFlag.includes(false)) {
    return false;
  } else {
    return true;
  }
}

export function clickUserRow(rowNum, rowType) {
  if (rowType == Constants.UserType.Visitor) UsersPage.visitorRows.value[0].click();
  else
    rowNum === undefined || rowNum <= 0
      ? UsersPage.userRows.value[0].click()
      : UsersPage.userRows.value[rowNum - 1].click();
  //wait for browser animation for opening side panel and loading all elements
  browser.pause(500);
}

export function getFirstRowUserName() {
  return UsersPage.userNameRow.value[0].getText();
}

export function getResultText() {
  browser.waitUntil(() => UsersPage.resultsText.getText() === 'Results', 5000, 'Results not displayed', 200);
  return UsersPage.resultFoundText.getText();
}

export function clearText() {
  UsersPage.searchTextField.clearElement();
}

export function getFirstRowDetails(UserAttribute) {
  if (UserAttribute == Constants.UserAttributes.Name) return UsersPage.userNameRow.value[0].getText();
  else if (UserAttribute == Constants.UserAttributes.Email) return UsersPage.userEmailRow.value[0].getText();
  else if (UserAttribute == Constants.UserAttributes.UID) return UsersPage.userUIDRow.value[0].getText();
}

export function verifySideBar(userType) {
  var ID;
  if (userType == Constants.UserType.User) {
    ID = UsersPage.userUIDRow.value[0].getText();
  } else {
    ID = lib.responseData.visitors[0].vid;
  }
  if (
    UsersPage.userIDSidePanel.getText() == ID &&
    UsersPage.userNameSidePanel.getText() == UsersPage.userNameRow.value[0].getText()
  ) {
    if (userType == Constants.UserType.User) {
      return UsersPage.userEmailSidePanel.getText() == UsersPage.userEmailRow.value[0].getText();
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function deleteUser() {
  UsersPage.userActions.click();
  UsersPage.deleteUserButton.click();
  CommonPage.iAmSureButton.click();
}

var userInputLabels = [],
  lcount;

export function addLabels(labelCount) {
  clickAddLabelButton();
  inputLabelDetails(undefined, labelCount);
  return (lcount = labelCount);
}

export function clickAddLabelButton() {
  browser.waitUntil(() => UsersPage.revealLabelsButton.isEnabled() === true, 5000, 'Reveal button not Visible', 100);
  UsersPage.revealLabelsButton.click();
  browser.pause(600);
  browser.waitUntil(() => UsersPage.addLabelButton.isEnabled() === true, 5000, 'Add Label button not Enabled', 100);
}

export function inputLabelDetails(label, labelCount) {
  if (labelCount === undefined) labelCount = label.length;
  var lname;
  userInputLabels = [];
  for (let i = 0; i < labelCount; i++) {
    label === undefined ? (lname = lib.randomString.generate(Math.floor(Math.random() * 10 + 3))) : (lname = label[i]);
    UsersPage.labelInput.setValue(lname);
    // browser.pause(500);
    UsersPage.addLabelButton.click();
    label === undefined;
    if (lname.length >= 2) {
      userInputLabels.push(lname.trim());
      browser.waitUntil(() => UsersPage.labels.value.length === i + 1, 5000, 'Label NOT Saved', 100);
    }
  }
  userInputLabels = userInputLabels.sort(lib.sortAlphabetically);
}

export function verifyAddedLabels() {
  var actualLabels = [],
    labelTxt;
  for (let l = 0; l < UsersPage.labels.value.length; l++) {
    labelTxt = UsersPage.labels.value[l].getText().slice(0, -2);
    actualLabels.push(labelTxt);
  }
  var match = JSON.stringify(userInputLabels).replace(/\s+/g, '') == JSON.stringify(actualLabels).replace(/\s+/g, '');
  userInputLabels = [];
  return match;
}

export function verifyLabelCount() {
  return Number(UsersPage.userRowLabelCount.getText().replace('+', '')) === lcount - 3;
}

export function clickLabelCount() {
  UsersPage.userRowLabelCount.click();
}

var deletedList = [];
export function deleteLabels(labelName) {
  deletedList = [];
  if (labelName === undefined) {
    let d = UsersPage.deleteLabelButton.value.length;
    while (d-- !== 0) {
      UsersPage.deleteLabelButton.value[d].click();
      browser.pause(300); //time required for label to be deleted from backend and reflect in frontend
    }
  } else {
    for (let d = 0; d < labelName.length; d++) {
      if (UsersPage.labels.value[d].getText().slice(0, -2) == labelName[d]) {
        UsersPage.deleteLabelButton.value[d].click();
        browser.pause(300); //time required for label to be deleted from backend and reflect in frontend
        deletedList = userInputLabels.filter(item => item !== labelName);
      }
    }
  }
  return deletedList;
}

export function verifyLabelDeleted() {
  browser.waitUntil(() => UsersPage.addedLabelsDiv.getText() == '');
  return UsersPage.addedLabelsDiv.getText() == '' ? true : false;
}

export function labelErrMsg() {
  return UsersPage.labelErrMsg.getText();
}

export function labelSuggestions(typedChars) {
  UsersPage.labelInput.setValue(typedChars);
  var dropDownList = [];
  browser.pause(1000); //time taken for sugesstions to load
  for (let s = 0; s < UsersPage.labelDropdown.value.length; s++) {
    dropDownList.push(UsersPage.labelDropdown.value[s].getText());
  }
  dropDownList.sort(lib.sortAlphabetically);
  return JSON.stringify(dropDownList).replace(/\s+/g, '') == JSON.stringify(userInputLabels).replace(/\s+/g, '');
}

export function selectLabelFromSuggestions(selectedLabel) {
  userInputLabels = [];
  for (let s = 0; s < UsersPage.labelDropdown.value.length; s++) {
    if (UsersPage.labelDropdown.value[s].getText() == selectedLabel) {
      UsersPage.labelDropdown.value[s].click();
      userInputLabels.push(selectedLabel);
    }
  }
  return userInputLabels;
}

export function closeSidePanel() {
  UsersPage.closeSidePanel.click();
}
export function search(value) {
  UsersPage.searchTextField.setValue(value);
}

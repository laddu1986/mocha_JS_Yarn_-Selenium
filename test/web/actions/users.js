import * as lib from '../../common';
import UsersPage from 'web/page_objects/usersPage';
import CommonPage from 'web/page_objects/common';
import Constants from 'data/constants.json'
var flag, finalFlag = [], i = 0, j = 0;
export function clickOnUsersTab() {
    UsersPage.usersTab.click();
}

export function getRecentUsersRows() {
    return UsersPage.userRows.value.length;
}

export function verifyUsersDetails(dataArray) {  //iterates thru the rows and verifies all users are shown on users page.
    dataArray.forEach(element => {
        finalFlag.push(flag);
        flag = false;
        while (dataArray.length != i) {
            if (element.uid == UsersPage.userUIDRow.value[i].getText() && element.e[0].fields.email == UsersPage.userEmailRow.value[i].getText() && element.e[0].fields.displayName == UsersPage.userNameRow.value[i].getText()) {
                i = 0;
                return flag = true;
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

export function clickFirstRow() {
    UsersPage.userRows.value[0].click();
}

export function getResultText() {
    browser.waitUntil(() => UsersPage.resultsText.getText() === 'Results', 5000, 'Results not displayed', 200);
    return UsersPage.resultFoundText.getText();
}

export function clearText() {
    UsersPage.searchTextField.clearElement();
}

export function getFirstRowDetails(UserAttribute) {
    if (UserAttribute == Constants.UserAttributes.Name)
        return UsersPage.userNameRow.value[0].getText();
    else if (UserAttribute == Constants.UserAttributes.Email)
        return UsersPage.userEmailRow.value[0].getText();
    else if (UserAttribute == Constants.UserAttributes.UID)
        return UsersPage.userUIDRow.value[0].getText();
}

export function verifySideBar(userType) {
    var ID;
    if (userType == Constants.UserType.User) {
        ID = UsersPage.userUIDRow.value[0].getText();
    }
    else {
        ID = lib.responseData.visitors[0].vid;
    }
    if (UsersPage.userIDSidePanel.getText() == ID && UsersPage.userNameSidePanel.getText() == UsersPage.userNameRow.value[0].getText()) {
        if (userType == Constants.UserType.User) {
            return (UsersPage.userEmailSidePanel.getText() == UsersPage.userEmailRow.value[0].getText());
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export function deleteUser() {
    UsersPage.deleteUserButton.click();
    CommonPage.iAmSureButton.click();
}

export function search(value) {
    UsersPage.searchTextField.setValue(value);
}

export function addLabels(labelCount) {
    if (labelCount === undefined) labelCount = 2;
    console.log(labelCount)
    var labelList = [], label
    clickAddLabelButton()
    while (labelCount-- > 0) {
        console.log(labelCount)

        label = lib.randomString.generate(Math.floor((Math.random() * 10) + 1))
        inputLabelDetails(label)
        labelList.push(label)
        browser.keys('Enter') //workaround
    }
    console.log('labelList ', labelList)

}

export function clickAddLabelButton() {
    UsersPage.addLabelButton.click()
}

export function inputLabelDetails(label) {
    UsersPage.labelInput.setValue(label)
}

export function verifyLabels(label, count) {
    if (UsersPage.labels.value[count].getText() === label) {
        return true;
    }
}

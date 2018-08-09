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

export function getFirstRowUserName() {
    return UsersPage.userNameRow.value[0].getText();
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

var userInputLabels, actualLabels = [], userInputLabels = [];

export function addLabels(labelCount) {
    if (labelCount === undefined) labelCount = 2;
    var label
    clickAddLabelButton()
    for (let i = 0; i < labelCount; i++) {
        label = lib.randomString.generate(Math.floor((Math.random() * 10) + 3))
        inputLabelDetails(label)
        browser.waitUntil(() => UsersPage.labels.value.length === i + 1, 5000, 'Added label is not visible', 100);
    }
    // return userInputLabels;
}

export function clickAddLabelButton() {
    UsersPage.addLabelButton.click()
}

export function inputLabelDetails(label) {
    UsersPage.labelInput.setValue(label)
    browser.keys('Enter') //workaround as Intercom logo overlaps '+' button and it cant be clicked
    userInputLabels.push(label)
    return userInputLabels = userInputLabels.sort(lib.sortAlphabetically);
}

export function verifyAddedLabels() {
    for (let l = 0; l < UsersPage.labels.value.length; l++) {
        actualLabels.push(UsersPage.labels.value[l].getText())
    }
    console.log('user and actual ', userInputLabels, actualLabels)
    return (JSON.stringify(userInputLabels) == JSON.stringify(actualLabels))
}

export function deleteLabels(labelName) {
    var deletedList = []
    if (labelName === undefined) {
        for (let d = UsersPage.labels.value.length; d > 0; d--) {
            UsersPage.deleteLabelButton.click()
            browser.pause(300) //time required for label to be deleted from DB and reflect on browser
            deletedList = userInputLabels.filter(item => item !== labelName)
        }

    } else {
        for (let d = 0; d < UsersPage.labels.value.length; d++) {
            if ((UsersPage.labels.value[d].getText()) == labelName) {
                UsersPage.deleteLabelButton.click()
                deletedList = userInputLabels.filter(item => item !== labelName)
            }
        }
    }
    // browser.waitUntil(() => UsersPage.addedLabelsDiv.getText() === '', 5000, 'Label not Deleted', 100);
    return deletedList

}

export function verifyLabelDeleted() {
    return (UsersPage.addedLabelsDiv.getText() === '' ? true : false)
}
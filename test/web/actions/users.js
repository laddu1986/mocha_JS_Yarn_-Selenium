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

export function clickUserRowNo(n) {
    n === undefined || n <= 0 ?
        UsersPage.userRows.value[0].click() :
        UsersPage.userRows.value[n - 1].click();
    browser.pause(400) // browser animation time for opening side panel
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

var userInputLabels, userInputLabels = [], lcount;

export function addLabels(labelCount) {
    clickAddLabelButton()
    inputLabelDetails(undefined, labelCount)
    return lcount = labelCount
}

export function clickAddLabelButton() {
    UsersPage.deleteUserButton.getText()
    UsersPage.addLabelButton.click()
}

export function inputLabelDetails(label, labelCount) {
    if (labelCount === undefined) labelCount = label.length;
    var lname;
    userInputLabels = [];
    for (let i = 0; i < labelCount; i++) {
        label === undefined ? lname = lib.randomString.generate(Math.floor((Math.random() * 10) + 3)) : lname = label[i]
        UsersPage.labelInput.setValue(lname)
        browser.keys('Enter') //workaround as Intercom logo overlaps '+' button and it cant be clicked by WDIO
        label === undefined
        if (lname.length >= 2) {
            userInputLabels.push(lname.trim())
            browser.waitUntil(() => UsersPage.labels.value.length === i + 1, 5000, 'Label NOT Saved', 100);
        }

    }
    return userInputLabels = userInputLabels.sort(lib.sortAlphabetically), lcount = labelCount
}

export function verifyAddedLabels() {
    var actualLabels = []
    for (let l = 0; l < UsersPage.labels.value.length; l++) {
        actualLabels.push(UsersPage.labels.value[l].getText())
    }
    console.log('\nuserInputLabels=', userInputLabels, '\nactualLabels=', actualLabels)
    var match = (JSON.stringify(userInputLabels).replace(/\s+/g, '') == JSON.stringify(actualLabels).replace(/\s+/g, ''))
    actualLabels = [], userInputLabels = []
    return match
}

export function verifyLabelCount() {
    return (Number(UsersPage.userRowLabelCount.getText().replace('+', '')) === (lcount - 3))
}

export function clickLabelCount() {
    UsersPage.userRowLabelCount.click()
}

var deletedList = []
export function deleteLabels(labelName) {
    UsersPage.deleteUserButton.scroll()
    deletedList = []
    if (labelName === undefined) {
        let d = UsersPage.deleteLabelButton.value.length
        while (d-- !== 0) {
            UsersPage.deleteLabelButton.value[d].click()
            browser.pause(300) //time required for label to be deleted from backend and reflect in frontend
        }
    } else {
        for (let d = 0; d < labelName.length; d++) {
            if ((UsersPage.labels.value[d].getText()) == labelName[d]) {
                UsersPage.deleteLabelButton.value[d].click()
                browser.pause(300) //time required for label to be deleted from backend and reflect in frontend
                deletedList = userInputLabels.filter(item => item !== labelName)
            }
        }
    }
    return deletedList
}

export function verifyLabelDeleted() {
    browser.waitUntil(() => UsersPage.addedLabelsDiv.getText() == '')
    return (UsersPage.addedLabelsDiv.getText() == '' ? true : false)
}

export function labelErrMsg() {
    return UsersPage.labelErrMsg.isVisible()
}

export function labelSuggestions(typedChars) {
    UsersPage.labelInput.setValue(typedChars)
    var dropDownList = []
    browser.pause(1000) //time taken for sugesstions to load 
    for (let s = 0; s < UsersPage.labelDropdown.value.length; s++) {
        dropDownList.push(UsersPage.labelDropdown.value[s].getText())
    }
    dropDownList.sort(lib.sortAlphabetically)
    return (JSON.stringify(dropDownList).replace(/\s+/g, '') == JSON.stringify(userInputLabels).replace(/\s+/g, ''))
}

export function selectLabelFromSuggestions(selectedLabel) {
    userInputLabels = []
    for (let s = 0; s < UsersPage.labelDropdown.value.length; s++) {
        if (UsersPage.labelDropdown.value[s].getText() == selectedLabel) {
            UsersPage.labelDropdown.value[s].click()
            userInputLabels.push(selectedLabel)
        }
    }
    return userInputLabels
}
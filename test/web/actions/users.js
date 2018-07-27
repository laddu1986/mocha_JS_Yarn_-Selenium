import * as lib from '../../common';
import UsersPage from 'web/page_objects/usersPage';
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
            if (element.uid == UsersPage.userUIDRow.value[i].getText() && element.e[0].fields.email == UsersPage.userEmailRow.value[i].getText() && element.e[0].fields.displayName == UsersPage.userNameRow.value[j].getText()) {
                i = j = 0;
                return flag = true;
            } else {
                i++;
            }
            j = j + 2;
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

export function verifySideBar(userType) {
    var ID;
    if (userType == Constants.UserType.User) {
        ID = UsersPage.userUIDRow.value[0].getText();
    }
    else {
        ID = lib.responseData.visitors[0].vid;
    }
    if (UsersPage.userIDSideBar.getText() == ID && UsersPage.userNameSideBar.getText() == UsersPage.userNameRow.value[0].getText()) {
        if (userType == Constants.UserType.User) {
            return (UsersPage.userEmailSideBar.getText() == UsersPage.userEmailRow.value[0].getText());
        } else {
            return true;
        }
    } else {
        return false;
    }

}
import * as lib from '../../common';
import UsersPage from 'web/page_objects/usersPage';
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

export function verifySideBar() {
    browser.pause(1000);
    if (UsersPage.userIDSideBar.getText() == UsersPage.userUIDRow.value[0].getText() && UsersPage.userEmailSideBar.getText() == UsersPage.userEmailRow.value[0].getText() && UsersPage.userNameSideBar.getText() == UsersPage.userNameRow.value[0].getText()) {
        return true;
    } else {
        return false;
    }
}
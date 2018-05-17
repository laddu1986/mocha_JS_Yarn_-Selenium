import CommonPage from '../page_objects/common';
import HomePage from '../page_objects/homePage';
import NavBar from '../page_objects/navBar';
import SignInPage from '../page_objects/signInPage';
import { click, waitForElement } from '../actions/actions';
import { web } from '../../common';




// var con = mysql.createConnection({
//     host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
//     user: 'rouser',
//     password: 'R34d0nlyK3y',
//     database: 'organization_dev'
// });

function getNotificationMessageText() {
    waitForElement(CommonPage.successMsg);
    return CommonPage.successMsg.getText();
}

function signOut() {
    click(HomePage.profileMenu);
    click(NavBar.signOut);
    waitForElement(SignInPage.signInButton);
}



export {
    getNotificationMessageText,
    signOut,
    
};
import HomePage from '../page_objects/homePage';
import CreateAccountPage from '../page_objects/createAccountPage'
import SignInPage from '../page_objects/signInPage';

import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as lib from '../../common';

function signOut() {
  click(HomePage.profileMenu);
  click(HomePage.signOut);
  waitForElement(SignInPage.signInButton);
}

export { signOut }
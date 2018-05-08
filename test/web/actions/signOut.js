import * as lib from '../../common';
import HomePage from 'web/page_objects/homePage';
import CreateAccountPage from 'web/page_objects/createAccountPage'
import SignInPage from 'web/page_objects/signInPage';

import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'

function signOut() {
  click(HomePage.profileMenu);
  click(HomePage.signOut);
  waitForElement(SignInPage.signInButton);
}

export { signOut }

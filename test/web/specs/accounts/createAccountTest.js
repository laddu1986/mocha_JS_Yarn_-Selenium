import * as lib from '../../../common';
import CreateAccountPage from 'web/page_objects/createAccountPage';
import HomePage from 'web/page_objects/homePage';
import SignInPage from 'web/page_objects/signInPage';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import { openApp, setValue, click, waitForEnable, waitForElement } from 'web/actions/actions';
import { createAccount } from 'web/actions/createAccount';

describe('Tests for Create Account', () => {
  before('Open create account page', () => {
    SignInPage.open();
  });

  it('Create Account', () => {
    createAccount();
    console.log(lib.testData.email);
    const logoPresent = HomePage.logo.isVisible();
    expect(logoPresent).to.equal(true);
  });
});


import { createAccount } from '../actions/createAccount';
import { createSpace } from '../actions/createSpace'
import HomePage from '../page_objects/homePage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import * as lib from '../../common';
import SignInPage from '../page_objects/signInPage'
import { openApp, setValue, click, waitForEnable, waitForElement } from '../actions/actions'

describe('Create Space Test', () => {
  before('Open App URL', () => {
    SignInPage.open(lib.config.api.base)
  });

  it('Create Account', () => {
    createAccount()
    expect(HomePage.logo.isVisible()).to.equal(true);
  })

  it('Create Space', () => {
    expect(OrgDashboardPage.createNewSpaceButton.isEnabled()).to.equal(false)
    createSpace()
  })
})


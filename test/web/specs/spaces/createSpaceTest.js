import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createFirstSpace, createAnotherSpace } from 'web/actions/createSpace'
import { signOut } from 'web/actions/signOut'
import HomePage from 'web/page_objects/homePage'
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'

import SignInPage from 'web/page_objects/signInPage'
import { openApp, setValue, click, waitForEnable, waitForElement } from 'web/actions/actions'
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';

describe('Space Tests', () => {
  before('Open App URL', () => {
    SignInPage.open();
    createAccount();
  });

  it('Verify Space Button', () => {
    expect(createSpaceActions.createSpaceButtonEnabled()).to.equal(false);
  });

  it('Verify creating first Space', () => {
    createSpaceActions.createSpace();
    expect(createSpaceActions.verifySpace()).to.equal(true);
  });

  it('Copy APIKey --> verify key is copied', () => {
    createSpaceActions.copyAPIKeyToClipBoard();
    expect(getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
    expect(createSpaceActions.copiedValue()).to.deep.equal(createSpaceActions.defaultAPIKey());
  })

  it('Verify creating two more spaces ', () => {
    for (var i = 0; i < 2; i++) {
      createSpaceActions.goBackToOrgDashboard();
      createSpaceActions.clickCreateNewSpaceButton();
      createSpaceActions.createSpace();
      createSpaceActions.verifySpace();
    }
  })

  xit('Sorting of Space cards stack', () => {
    //TO BE IMPLEMENTED WHEN E2E wiring is complete
  });

  xit('Delete Space', () => {

  });

  xit('Edit Space', () => {

  });

  after('Sign Out', () => {
    signOut();
  })
})

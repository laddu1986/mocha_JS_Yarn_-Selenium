import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage';
import { verifySpaceOrder, verifyCreateFirstSpacePage, createSpace, verifySpacePage, goBackToOrgDashboard, clickCreateNewSpaceButton, } from 'web/actions/space';
import SignInPage from 'web/page_objects/signInPage';
import { getNotificationMessageText, signIn, signOut } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';
import orgDashboardPage from '../../page_objects/orgDashboardPage';
var accountDetail, spaceName1, spaceName = [];

describe(`Space Tests ${lib.Tags.smokeTest}`, () => {
  before('Open App URL', () => {
    SignInPage.open();
    accountDetail = createAccount();
  });

  it('Verify create your first Space page', () => {
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });

  it('Verify creating first Space', () => {
    spaceName1 = createSpace();
    expect(verifySpacePage(spaceName1.toLowerCase())).to.equal(true);
  });

  it('Verify creating two more spaces ', () => {
    for (var i = 0; i < 2; i++) {
      goBackToOrgDashboard();
      clickCreateNewSpaceButton();
      spaceName[i] = createSpace();
      expect(verifySpacePage(spaceName[i].toLowerCase())).to.equal(true);
    }
  })

  it(`\nSign out and back in --> Should show last accessed Space`, () => {
    signOut();
    signIn(accountDetail.email, accountDetail.password);
    expect(verifySpacePage(spaceName[1].toLowerCase())).to.equal(true);
  });

  it('\nSorting of Space cards stack', () => {
    goBackToOrgDashboard();
    expect(verifySpaceOrder('2')).to.include(spaceName1);
    expect(verifySpaceOrder('1')).to.include(spaceName[0]);
    expect(verifySpaceOrder('0')).to.include(spaceName[1]);
  });

  after('Sign Out', () => {
    signOut();
  })
})


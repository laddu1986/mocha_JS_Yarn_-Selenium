import * as lib from '../../common';
import { createAccount } from 'actions/account';
import {
  verifySpaceOrder,
  verifyCreateFirstSpacePage,
  createSpace,
  verifySpacePage,
  goBackToOrgDashboard,
  clickCreateNewSpaceButton
} from 'actions/space';
import accountPage from 'page_objects/accountPage';
import { signIn, signOut } from 'actions/common';
var accountDetail,
  spaceName1,
  spaceName = [];

describe('Space Tests', () => {
  before('Open App URL', () => {
    accountPage.open();
    accountDetail = createAccount();
  });

  it('C1295711 Verify create your first Space page', () => {
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });

  it(`C1295712 Verify creating first Space ${lib.Tags.smokeTest}`, () => {
    spaceName1 = createSpace();
    expect(verifySpacePage(spaceName1.toLowerCase())).to.equal(true);
  });

  it('C1295713 Verify creating two more spaces ', () => {
    for (var i = 0; i < 2; i++) {
      goBackToOrgDashboard();
      clickCreateNewSpaceButton();
      spaceName[i] = createSpace();
      expect(verifySpacePage(spaceName[i].toLowerCase())).to.equal(true);
    }
  });

  it('C1295714 Sign out and back in --> Should show last accessed Space', () => {
    signOut();
    signIn(accountDetail.email, accountDetail.password);
    expect(verifySpacePage(spaceName[1].toLowerCase())).to.equal(true);
  });

  it('C1295715 Sorting of Space cards stack', () => {
    goBackToOrgDashboard();
    expect(verifySpaceOrder('2')).to.include(spaceName1);
    expect(verifySpaceOrder('1')).to.include(spaceName[0]);
    expect(verifySpaceOrder('0')).to.include(spaceName[1]);
  });

  after('Sign Out', () => {
    signOut();
  });
});

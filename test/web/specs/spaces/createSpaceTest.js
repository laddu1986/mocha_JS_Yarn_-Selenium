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
var accountDetail, spaceName1, spaceName2, spaceName3;

describe('Space Tests', () => {
  before('Open App URL', () => {
    accountPage.open();
    accountDetail = createAccount();
  });

  it('Verify create your first Space page', () => {
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });

  it(`Verify creating first Space ${lib.Tags.smokeTest}`, () => {
    spaceName1 = createSpace();
    expect(verifySpacePage(spaceName1.toLowerCase())).to.equal(true);
  });

  it('Verify creating second space', () => {
    goBackToOrgDashboard();
    clickCreateNewSpaceButton();
    spaceName2 = createSpace();
    expect(verifySpacePage(spaceName2.toLowerCase())).to.equal(true);
  });

  it('Verify creating third space', () => {
    goBackToOrgDashboard();
    clickCreateNewSpaceButton();
    spaceName3 = createSpace();
    expect(verifySpacePage(spaceName3.toLowerCase())).to.equal(true);
  });

  it('Sign out and back in --> Should show last accessed Space', () => {
    signOut();
    signIn(accountDetail.email, accountDetail.password);
    expect(verifySpacePage(spaceName3.toLowerCase())).to.equal(true);
  });

  it('Sorting of Space cards stack -1', () => {
    goBackToOrgDashboard();
    expect(verifySpaceOrder('2')).to.include(spaceName1);
  });

  it('Sorting of Space cards stack -2', () => {
    expect(verifySpaceOrder('1')).to.include(spaceName2);
  });

  it('Sorting of Space cards stack -3', () => {
    expect(verifySpaceOrder('0')).to.include(spaceName3);
  });

  after('Sign Out', () => {
    signOut();
  });
});

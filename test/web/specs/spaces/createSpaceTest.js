import * as lib from '../../../common';
import { createAccount } from 'web/actions/account';
import { verifySpaceOrder, verifyCreateFirstSpacePage, createSpace, verifySpacePage, goBackToOrgDashboard, clickCreateNewSpaceButton, } from 'web/actions/space';
import accountPage from 'web/page_objects/accountPage';
import { signIn, signOut } from 'web/actions/common';
var accountDetail, spaceName1, spaceName = [];

describe(`Space Tests ${lib.Tags.smokeTest}`, () => {
  before('Open App URL', () => {
    accountPage.open()
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

  it('Sign out and back in --> Should show last accessed Space', () => {
    signOut();
    signIn(accountDetail.email, accountDetail.password);
    expect(verifySpacePage(spaceName[1].toLowerCase())).to.equal(true);
  });

  it('Sorting of Space cards stack', () => {
    goBackToOrgDashboard();
    expect(verifySpaceOrder('2')).to.include(spaceName1);
    expect(verifySpaceOrder('1')).to.include(spaceName[0]);
    expect(verifySpaceOrder('0')).to.include(spaceName[1]);
  });

  after('Sign Out', () => {
    signOut();
  })
})
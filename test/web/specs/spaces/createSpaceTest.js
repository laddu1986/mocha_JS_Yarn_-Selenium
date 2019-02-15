import * as lib from '../../common';
import {
  verifySpaceOrder,
  verifyCreateFirstSpacePage,
  createSpace,
  verifySpacePage,
  goBackToOrgDashboard,
  clickCreateNewSpaceButton
} from 'actions/space';
import SignInPage from 'page_objects/signInPage';
import { selectOrg } from 'actions/organization';
import { signOut } from 'actions/navBar';
import { signIn, postIdentity, postOrganization, postMembership } from 'actions/common';
var spaceName1, spaceName2, spaceName3;
const accountData = new Object();
describe('Space Tests', () => {
  before(async () => {
    await postIdentity(accountData);
    await postOrganization(accountData);
    await postMembership(accountData);
  });
  before('Open App URL', () => {
    SignInPage.open();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    selectOrg();
  });

  it('C1295711 Verify create your first Space page', () => {
    expect(verifyCreateFirstSpacePage()).to.equal(true);
  });

  it(`C1295712 Verify creating first Space ${lib.Tags.smokeTest}`, () => {
    spaceName1 = createSpace();
    expect(verifySpacePage(spaceName1.toLowerCase())).to.equal(true);
  });

  it('C1295713 Verify creating second space', () => {
    goBackToOrgDashboard();
    clickCreateNewSpaceButton();
    spaceName2 = createSpace();
    expect(verifySpacePage(spaceName2.toLowerCase())).to.equal(true);
  });

  it('C1640157 Verify creating third space', () => {
    goBackToOrgDashboard();
    clickCreateNewSpaceButton();
    spaceName3 = createSpace();
    expect(verifySpacePage(spaceName3.toLowerCase())).to.equal(true);
  });

  it('C1295714 Sign out and back in --> Should show last accessed Space', () => {
    signOut();
    signIn(accountData.identityEmail, process.env.ACCOUNT_PASS);
    expect(verifySpacePage(spaceName3.toLowerCase())).to.equal(true);
  });

  it('C1295715 Sorting of Space cards stack -1', () => {
    goBackToOrgDashboard();
    expect(verifySpaceOrder('2')).to.include(spaceName1);
  });

  it('C1640158 Sorting of Space cards stack -2', () => {
    expect(verifySpaceOrder('1')).to.include(spaceName2);
  });

  it('C1640159 Sorting of Space cards stack -3', () => {
    expect(verifySpaceOrder('0')).to.include(spaceName3);
  });

  after('Sign Out', () => {
    signOut();
  });
});

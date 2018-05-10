import { createAccount } from '../actions/createAccount';
import { signOut } from '../actions/signOut';
import * as createSpaceActions from '../actions/createSpace';
import * as commonActions from '../actions/actions';
import SignInPage from '../page_objects/signInPage';
import spaceData from '../data/space.json';

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
    expect(commonActions.getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
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


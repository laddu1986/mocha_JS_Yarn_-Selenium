import { createAccount } from '../actions/createAccount';
import { signOut } from '../actions/signOut';
import * as createSpaceActions from '../actions/createSpace';
import * as lib from '../../common';
import SignInPage from '../page_objects/signInPage';

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
      expect(createSpaceActions.copyToastMessage()).to.include("Copied to clipboard");
      expect(createSpaceActions.copiedValue()).to.deep.equal(createSpaceActions.defaultAPIKey());
    })

    it('Verify creating two more spaces ', () => {
      for(var i=0;i<2;i++){
        createSpaceActions.goBackToSpacesPage();
        createSpaceActions.clickCreateNewSpaceButton();
        createSpaceActions.createSpace();
        createSpaceActions.verifySpace();
      }
    })

    xit('Last created Space should be at the top of the Space cards stack', () => {     
      //TO BE IMPLEMENTED WHEN E2E wiring is complete
    })

  after('Sign Out', () => {
    signOut();
  })
})


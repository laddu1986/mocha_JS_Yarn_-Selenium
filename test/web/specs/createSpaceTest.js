import { createAccount } from '../actions/createAccount';
import { createFirstSpace, createAnotherSpace } from '../actions/createSpace'
import { signOut } from '../actions/signOut'
import HomePage from '../page_objects/homePage'
import OrgDashboardPage from '../page_objects/orgDashboardPage'
import * as lib from '../../common';
import SignInPage from '../page_objects/signInPage'
import { openApp, setValue, click, waitForEnable, waitForElement } from '../actions/actions'
import SpaceDashboardPage from '../page_objects/spaceDashboardPage';

describe('Space Tests', () => {
  before('Open App URL', () => {
    SignInPage.open()
    //console.log(lib.testData)
  });

  after('Sign Out', () => {
    signOut()
  })

  describe('Create Your First Space', () => {
    it('Create Account', () => {
      createAccount()
      expect(HomePage.logo.isVisible()).to.equal(true);
    })

    it('Create First Space', () => {
      expect(OrgDashboardPage.createSpaceButton.isEnabled()).to.equal(false)
      createFirstSpace()
    })
  })

  describe('Create two more spaces', () => {
    it('Create space by clicking on create new space button', () => {
      const goBackToOrg = (lib.config.api.base + '/' + lib.testData.organization).toLowerCase() + '/'
      console.log(goBackToOrg)
      for (let i = 0; i < 3; i++) {
        browser.url(goBackToOrg) //Temporary - will change when we have a "Go Back to OrgDashBoard" link in the space page
        waitForElement(OrgDashboardPage.spaceCards)
        createAnotherSpace()
      }
    }, 3)

    it('Last created Space should be at the top of the Space cards stack', () => {
      /* 
      
      TO BE IMPLEMENTED WHEN E2E wiring is complete
      
      */
    })

  })

})


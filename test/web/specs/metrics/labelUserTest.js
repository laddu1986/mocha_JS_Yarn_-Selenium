import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, defaultAPIKey } from 'web/actions/space';
import { addUsers, getUserStatsCount, addVisitor } from 'web/actions/metrics';
import { clickOnAudienceLink, clickOnSpaceDashboardLink } from 'web/actions/navBar';
import { clickOnUsersTab, inputLabelDetails, verifyAddedLabels, clickFirstRow, clickAddLabelButton, addLabels, deleteLabels, verifyLabelDeleted } from 'web/actions/users';
var apiKey, label;

describe('Labels Test', () => {
  before('Setup', () => {
    accountPage.open()
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = defaultAPIKey();
  });

  before(async () => {
    await addUsers(2, apiKey);
  })

  describe('Add and Delete a Label', () => {
    it('Click on a user row to open side Panel', () => {
      clickOnAudienceLink();
      clickOnUsersTab();
      clickFirstRow();
      browser.pause(1000);
    });

    it('Enter a label and verify it gets added', () => {
      clickAddLabelButton()
      inputLabelDetails('testLabel')
      expect(verifyAddedLabels()).to.equal(true)
    });

    it('Delete the added Label', () => {
      deleteLabels()
      browser.pause(5000)
      expect(verifyLabelDeleted()).to.equal(true)
    });

  });



  xit('Add one or more labels with more than 2 chars length ', () => {
    clickOnAudienceLink();
    clickOnUsersTab();
    clickFirstRow();
    browser.pause(1000);
    var labelCount1to10 = Math.floor((Math.random() * 10) + 1)
    addLabels(6)

    /* clickAddLabelButton();
    var labelCount = Math.floor((Math.random() * 10) + 2)
    var labelList = []
    while (labelCount-- > 0) {
      label = lib.randomString.generate(Math.floor((Math.random() * 20) + 1))
      inputLabelDetails(label)
      labelList.push(label)
      browser.keys('Enter') //workaround
    } */
    // console.log('labelList ', labelList)
    // browser.pause(1000)
    // clickAddLabelButton();
    // expect(verifyLabels(label, '2')).to.equal(true);
    expect(verifyAddedLabels()).to.equal(true)
    deleteLabels()
    expect(verifyLabelDeleted()).to.equal(true)
  });
})


// var arr1 = 'abcde';
// var arr2 = 'abcde';
// let found = arr1.some(r => arr2.indexOf(r) >= 0)
// console.log(found)


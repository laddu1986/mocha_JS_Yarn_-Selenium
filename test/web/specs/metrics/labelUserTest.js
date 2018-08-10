import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, defaultAPIKey } from 'web/actions/space';
import { addUsers } from 'web/actions/metrics';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { clickOnUsersTab, inputLabelDetails, verifyAddedLabels, clickAddLabelButton, addLabels, deleteLabels, verifyLabelDeleted, clickUserRowNo } from 'web/actions/users';
var apiKey;

describe('User Labels Test', () => {
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

  describe('Test Error Handling with bad data', () => {
    it('', () => {

    });
  });

  describe('Add and Delete a Label', () => {
    it('Click on a user row to open side Panel', () => {
      clickOnAudienceLink();
      clickOnUsersTab();
      clickUserRowNo(0);
    });

    it('Enter a label and verify it gets added', () => {
      clickAddLabelButton()
      inputLabelDetails('testLabel')
      expect(verifyAddedLabels()).to.equal(true)
    });

    it('Delete the added Label', () => {
      deleteLabels()
      expect(verifyLabelDeleted()).to.equal(true)
    });

  });

  describe('Multiple Labels and Sorting', () => {

    it('Add multiple labels -> verify they are sorted alphabetically', () => {
      clickOnAudienceLink();
      clickOnUsersTab();
      clickUserRowNo(2);
      var labelCount1to10 = Math.floor((Math.random() * 10) + 1)
      addLabels(labelCount1to10)
      expect(verifyAddedLabels()).to.equal(true)
    });

    it('Delete labels and verify all labels are deleted', () => {
      deleteLabels()
      expect(verifyLabelDeleted()).to.equal(true)
    });
  });

})

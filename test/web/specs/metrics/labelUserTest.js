import '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'web/actions/space';
import { addUsers } from 'web/actions/metrics';
import {
  gotoUsersTab,
  inputLabelDetails,
  verifyAddedLabels,
  clickAddLabelButton,
  addLabels,
  deleteLabels,
  verifyLabelDeleted,
  clickUserRow,
  labelSuggestions,
  verifyLabelCount,
  clickLabelCount,
  selectLabelFromSuggestions
} from 'web/actions/users';
var apiKey;

describe('User Labels Test', () => {
  before('Setup', () => {
    accountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = getAPIKey();
  });

  before(async () => {
    await addUsers(6, apiKey);
  });

  describe('Test Add and Delete a Label', () => {
    it('Click on a user row to open side Panel', () => {
      gotoUsersTab();
      clickUserRow(3);
    });

    it('Enter a label and verify it gets Saved', () => {
      clickAddLabelButton();
      inputLabelDetails(['testLabel123']);
      expect(verifyAddedLabels()).to.equal(true, 'Label was not Added/Saved');
    });

    it('Delete the added Label', () => {
      deleteLabels(['testLabel123']);
      expect(verifyLabelDeleted()).to.equal(true, 'Label was not Deleted');
    });
  });

  describe('Test with Multiple Labels and Sorting', () => {
    it('Add multiple labels -> verify they are sorted alphabetically', () => {
      gotoUsersTab();
      clickUserRow(4);
      var labelCount = Math.floor(Math.random() * 10 + 4);
      addLabels(labelCount);
      expect(verifyAddedLabels()).to.equal(true, 'Labels were not Added/Saved');
    });

    it('Verify label count on user row and clicking it re-directs to label details section', () => {
      gotoUsersTab();
      expect(verifyLabelCount()).to.equal(true, 'Label count incorrect in User row');
      clickLabelCount();
    });
  });

  describe('Test Label suggestions', () => {
    it('Add labels to a user', () => {
      gotoUsersTab();
      clickUserRow(5);
      clickAddLabelButton();
      inputLabelDetails(['dropdown', 'dropbox', 'dropkick', 'drop the beat']);
    });

    it('Verify added labels appears in suggestions for other users', () => {
      gotoUsersTab();
      clickUserRow(6);
      clickAddLabelButton();
      expect(labelSuggestions('dr')).to.equal(true, 'Label Suggestion did not appear');
    });

    it('Select a label from suggestions and verify it is Saved', () => {
      selectLabelFromSuggestions('dropkick');
      expect(verifyAddedLabels()).to.equal(true, 'Label was not Added/Saved');
    });
  });
});

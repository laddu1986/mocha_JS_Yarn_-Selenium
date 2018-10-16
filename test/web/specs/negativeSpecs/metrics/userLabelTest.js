import '../../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace, goToDeveloperPortal, getAPIKey } from 'web/actions/space';
import { addUsers } from 'web/actions/metrics';
import * as ErrMsg from 'web/data/messages.json';
import {
  gotoUsersTab,
  inputLabelDetails,
  verifyAddedLabels,
  clickAddLabelButton,
  clickUserRow,
  labelErrMsg
} from 'web/actions/users';

var apiKey;

describe('User Labels Negative Test for Err Msgs', () => {
  before('Setup', () => {
    accountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
    apiKey = getAPIKey();
  });

  before(async () => {
    await addUsers(2, apiKey);
  });

  describe('Tests Label error messages', () => {
    it('Display error message when Invalid character in entered', () => {
      gotoUsersTab();
      clickUserRow(1);
      clickAddLabelButton();
      const specialChar = `!@#$%^&*()+{}|?<>~[]=÷"`.split('')[Math.floor(Math.random() * 23)];
      inputLabelDetails([specialChar]);
      expect(labelErrMsg()).to.include(
        ErrMsg.label.invalidChar,
        `Incorrect Err Msg when invalid char - '${specialChar}' is typed in Label input`
      );
    });

    it('Display error message when less than 2 characters is entered', () => {
      gotoUsersTab();
      clickUserRow(1);
      clickAddLabelButton();
      inputLabelDetails(['a']);
      expect(labelErrMsg()).to.include(
        ErrMsg.label.minimumChar,
        `Incorrect Err Msg when single char 'a' is typed in Label input`
      );
    });

    it('Display error message when duplicate label is entered', () => {
      gotoUsersTab();
      clickUserRow(1);
      clickAddLabelButton();
      inputLabelDetails(['testing duplicate label addition']);
      expect(verifyAddedLabels()).to.equal(true, 'Label was not Added/Saved');
      inputLabelDetails(['testing duplicate label addition']);
      expect(labelErrMsg()).to.include(
        ErrMsg.label.duplicateLabel,
        'Incorrect Err Msg when when duplicate label is typed in Label input'
      );
    });

    it('Verify trimming of Leading and Trailing spaces in label names while Saving ', () => {
      gotoUsersTab();
      clickUserRow(2);
      clickAddLabelButton();
      inputLabelDetails(['    firstLabel   ']);
      expect(verifyAddedLabels()).to.equal(true);
    });
  });
});

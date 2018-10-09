import '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import {
  getAPIKey,
  createSpace,
  goToDeveloperPortal,
  copyAPIKeyToClipBoard,
  copiedAPIKeyValue
} from 'web/actions/space';
import { getNotificationMessageText } from 'web/actions/common';
import spaceData from 'web/data/passiveNotification.json';

describe('Space API Key Tests', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
  });

  it('Copy --> verify key is copied', () => {
    copyAPIKeyToClipBoard();
    expect(getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
    expect(copiedAPIKeyValue()).to.deep.equal(getAPIKey());
  });
});

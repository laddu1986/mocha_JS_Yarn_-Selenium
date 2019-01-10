import '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { getAPIKey, createSpace, goToDeveloperPortal, copyAPIKeyToClipBoard, copiedAPIKeyValue } from 'actions/space';
import { getNotificationMessageText } from 'actions/common';
import spaceData from 'data/passiveNotification.json';

describe('Space API Key Tests', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    goToDeveloperPortal();
  });

  it('Copy --> verify key is copied', () => {
    copyAPIKeyToClipBoard();
    expect(copiedAPIKeyValue()).to.deep.equal(getAPIKey());
  });

  it('Verify passive notification', () => {
    expect(getNotificationMessageText()).to.include(spaceData.copyNotificationMessage.text);
  });
});

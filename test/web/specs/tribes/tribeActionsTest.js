import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { clickOnAudienceLink } from 'actions/navBar';
import { getNotificationMessageText } from 'actions/common';
import {
  deleteTribe,
  updateTribe,
  verifyTribe,
  createTribe,
  goToTribeDetailPage,
  verifyTribeDetailpage,
  verifyAllTribesPage
} from 'actions/tribe';
import * as Constants from 'constants.json';
import * as PassiveNotification from 'data/passiveNotification.json';
var name = lib.randomString.generate(5),
  newName = `${lib.randomString.generate(5)}_newName`;

describe('Tribe Actions Tests', () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
    clickOnAudienceLink();
    createTribe(name);
    clickOnAudienceLink();
  });

  it('Click on Tribe card --> lands on card details page', () => {
    goToTribeDetailPage();
    expect(verifyTribeDetailpage()).to.equal(true, 'Tribe Details page is not displayed');
  });

  it('Update the Tribe Title --> verify new name on all tribes and tribe detail page', () => {
    updateTribe(Constants.TribeAttributes.Title, newName);
    verifyTribe(Constants.TribeAttributes.Title, newName);
    clickOnAudienceLink();
    browser.refresh();
    verifyTribe(Constants.TribeAttributes.Title, newName);
  });

  it('Delete Tribe --> verify the passive notification and redirection to all tribes page', () => {
    goToTribeDetailPage();
    deleteTribe();
    expect(getNotificationMessageText()).to.include(`${PassiveNotification.deleteMessage.text}'${newName}'.`);
    expect(verifyAllTribesPage()).to.equal(true, 'After deleting tribe redirection to all tribes page did not work');
  });
});

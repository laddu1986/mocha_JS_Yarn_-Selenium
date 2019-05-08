import * as lib from '../../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import * as Constants from 'constants.json';
import { clickOnAudienceLink } from 'actions/navBar';
import {
  verifyAllTribesPage,
  verifyTitleOnCard,
  inputTribeDetails,
  clickCreateTribeLink,
  verifyTribe,
  clickCreateTribeButton,
  verifyTribeDetailpage
} from 'actions/tribe';
var title;

describe(`Create Tribe Tests ${lib.Tags.smokeTest}`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
  });

  it('C1295735 Go to create a tribe page --> verify create tribe button and hover over + link', () => {
    clickOnAudienceLink();
    expect(verifyAllTribesPage()).to.equal(true, 'Create Tribe page is not displayed');
  });

  it('C1295736 Go to tribe detail page using create tribe button', () => {
    clickCreateTribeButton();
    expect(verifyTribeDetailpage()).to.equal(true, 'Tribe Details page is not displayed');
  });

  it('C1295737 Verify untitled tribe is created', () => {
    verifyTribe(Constants.TribeAttributes.Title, 'Untitled');
  });

  it('C1295738 Verify untitled tribe on all tribes page', () => {
    clickOnAudienceLink();
    verifyTribe(Constants.TribeAttributes.Title, 'Untitled');
  });

  it('C1295739 Create named tribe using hover over + link', () => {
    title = lib.randomString(5);
    clickCreateTribeLink();
    inputTribeDetails(title);
    verifyTitleOnCard(title, '0');
  });

  it('C1295740 Verify tribe title on all tribes page', () => {
    clickOnAudienceLink();
    browser.refresh();
    verifyTitleOnCard(title, '1');
  });
});

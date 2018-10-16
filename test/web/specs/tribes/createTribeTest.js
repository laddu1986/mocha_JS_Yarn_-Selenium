import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import * as Constants from 'data/constants.json';
import { clickOnAudienceLink } from 'web/actions/navBar';
import {
  verifyAllTribesPage,
  verifyTitleOnCard,
  inputTribeDetails,
  clickCreateTribeLink,
  verifyTribe,
  clickCreateTribeButton,
  verifyTribeDetailpage
} from 'web/actions/tribe';
var title;

describe(`Create Tribe Tests ${lib.Tags.smokeTest}`, () => {
  before(() => {
    accountPage.open();
    createAccount();
    createSpace();
  });

  it('Go to create a tribe page --> verify create tribe button and hover over + link', () => {
    clickOnAudienceLink();
    expect(verifyAllTribesPage()).to.equal(true, 'Create Tribe page is not displayed');
  });

  it('Go to tribe detail page using create tribe button', () => {
    clickCreateTribeButton();
    expect(verifyTribeDetailpage()).to.equal(true, 'Tribe Details page is not displayed');
  });

  it('Verify untitled tribe is created', () => {
    expect(verifyTribe(Constants.TribeAttributes.Title, 'Untitled')).to.equal(true, 'Tribe title is not "Untitled"');
  });

  it('Verify untitled tribe on all tribes page', () => {
    clickOnAudienceLink();
    expect(verifyTribe(Constants.TribeAttributes.Title, 'Untitled')).to.equal(
      true,
      'Tribe title is not "Untitled" on all tribes page'
    );
  });

  it('Create named tribe using hover over + link', () => {
    title = lib.randomString.generate(5);
    clickCreateTribeLink();
    inputTribeDetails(title);
    expect(verifyTitleOnCard(title, '0')).to.equal(true, 'The title on tribe details page does not show');
  });

  it('Verify tribe title on all tribes page', () => {
    clickOnAudienceLink();
    browser.refresh();
    expect(verifyTitleOnCard(title, '1')).to.equal(true, 'The title on all tribes page does not show');
  });
});

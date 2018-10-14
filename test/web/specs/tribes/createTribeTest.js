import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import * as Constants from 'data/constants.json';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { verifyAllTribesPage, verifyTitleOnCard, inputTribeDetails, clickCreateTribeLink, verifyTribe, clickCreateTribeButton, verifyTribeDetailpage } from 'web/actions/tribe';
var title;

describe('Create Tribe Tests', () => {
    before(() => {
        accountPage.open()
        createAccount();
        createSpace();
    });

    it('Go to create a tribe page --> verify create tribe button and hover over + link', () => {
        clickOnAudienceLink();
        expect(verifyAllTribesPage()).to.equal(true);
    });

    it(`Go to tribe detail page using create tribe button ${lib.Tags.smokeTest}`, () => {
        clickCreateTribeButton();
        expect(verifyTribeDetailpage()).to.equal(true);
    });

    it(`Verify untitled tribe is created ${lib.Tags.smokeTest}`, () => {
        expect(verifyTribe(Constants.TribeAttributes.Title, "Untitled")).to.equal(true);
    });

    it('Verify untitled tribe on all tribes page', () => {
        clickOnAudienceLink();
        expect(verifyTribe(Constants.TribeAttributes.Title, "Untitled")).to.equal(true);
    });

    it('Create named tribe using hover over + link', () => {
        title = lib.randomString.generate(5);
        clickCreateTribeLink();
        inputTribeDetails(title);
        expect(verifyTitleOnCard(title, "0")).to.equal(true);
    });

    it('Verify tribe title on all tribes page', () => {
        clickOnAudienceLink();
        browser.pause(2000);
        expect(verifyTitleOnCard(title, "1")).to.equal(true);
    });
});
import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { getNotificationMessageText } from 'web/actions/common';
import { deleteTribe, updateTribe, verifyTribe, createTribe, goToTribeDetailPage, verifyTribeDetailpage, verifyAllTribesPage } from 'web/actions/tribe';
import * as Constants from 'data/constants.json';
import * as PassiveNotification from 'web/data/passiveNotification.json';
var name = lib.randomString.generate(5), tagline = lib.randomString.generate(9), newName = `${lib.randomString.generate(5)}_newName`;

describe('Tribe Actions Tests', () => {
    before(() => {
        accountPage.open()
        createAccount();
        createSpace();
        clickOnAudienceLink();
        createTribe(name, tagline);
        clickOnAudienceLink();
    });

    it('Click on Tribe card --> lands on card details page', () => {
        goToTribeDetailPage();
        expect(verifyTribeDetailpage()).to.equal(true);
    });

    it('Update the Tribe Title --> verify new name on all tribes and tribe detail page', () => {
        updateTribe(Constants.TribeAttributes.Title, newName);
        expect(verifyTribe(Constants.TribeAttributes.Title, newName)).to.equal(true);
        clickOnAudienceLink();
        browser.refresh();
        expect(verifyTribe(Constants.TribeAttributes.Title, newName)).to.equal(true);
    });

    it('Delete Tribe --> verify the passive notification and redirection to all tribes page', () => {
        goToTribeDetailPage();
        deleteTribe();
        expect(getNotificationMessageText()).to.include(`${PassiveNotification.deleteMessage.text}\'${newName}\'.`);
        expect(verifyAllTribesPage()).to.equal(true);
    })
});
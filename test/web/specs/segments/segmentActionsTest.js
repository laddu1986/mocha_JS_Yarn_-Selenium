import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { getNotificationMessageText, confirmButtonIsEnabled, typeDeleteToConfirm, confirmDelete } from 'web/actions/common';
import { updateSegment, deleteSegment, clickOnAudienceLink, verifySegment, createSegment, goToSegmentDetailPage, verifySegmentDetailpage, verifyAllSegmentsPage, clickDeleteSegButton, cancelDeleteSegment } from 'web/actions/segment';
import * as Constants from 'data/constants.json';
import * as PassiveNotification from 'web/data/passiveNotification.json';
var name = lib.randomString.generate(5), tagline = lib.randomString.generate(9), newName = `${lib.randomString.generate(5)}_newName`, newTagline = `${lib.randomString.generate(5)}_newTagline`;

describe('Segment Actions Tests', () => {
    before(() => {
        SignInPage.open();
        createAccount();
        createSpace();
        createSegment(name, tagline);
    });

    it('Click on Segment card --> lands on card details page', () => {
        goToSegmentDetailPage();
        expect(verifySegmentDetailpage()).to.equal(true);
    });

    it('Update the Segment Title --> verify new name on all segments and segment detail page', () => {
        updateSegment(Constants.SegmentAttributes.Title, newName);
        expect(verifySegment(Constants.SegmentAttributes.Title, newName)).to.equal(true);
        clickOnAudienceLink();
        browser.pause(200);
        expect(verifySegment(Constants.SegmentAttributes.Title, newName)).to.equal(true);
    });

    it('Update the Segment Tagline --> verify new tagline on all segments and segment detail page', () => {
        goToSegmentDetailPage();
        updateSegment(Constants.SegmentAttributes.Tagline, newTagline);
        expect(verifySegment(Constants.SegmentAttributes.Tagline, newTagline)).to.equal(true);
        clickOnAudienceLink();
        browser.pause(200);
        expect(verifySegment(Constants.SegmentAttributes.Tagline, newTagline)).to.equal(true);
    });

    it('Delete Segment --> verify Cancel action on Delete modal', () => {
        goToSegmentDetailPage();
        clickDeleteSegButton();
        expect(cancelDeleteSegment()).to.equal(true)
    });

    it('Delete Segment --> verify the passive notification and redirection to all segments page', () => {
        clickDeleteSegButton();
        expect(confirmButtonIsEnabled()).to.equal(false)
        typeDeleteToConfirm();
        expect(confirmButtonIsEnabled()).to.equal(true)
        confirmDelete()
        expect(getNotificationMessageText()).to.include(`${PassiveNotification.deleteMessage.text}\'${newName}\'.`);
        expect(verifyAllSegmentsPage()).to.equal(true);
    })
});
import * as lib from '../../../common';
import SignInPage from 'web/page_objects/signInPage'
import { createAccount } from 'web/actions/account';
import * as createSpaceActions from 'web/actions/space';
import { verifyAllSegmentsPage, verifySegmentCardColour, selectColour, verifyTagAndTitleOnCard, inputSegmentDetails, clickCreateSegmentLink, verifyUntitledSegment, clickCreateSegmentButton, clickOnAudienceLink, verifySegmentDetailpage } from 'web/actions/segment';
var title, tagline;

describe('Create Segment Tests', () => {
    before(() => {
        SignInPage.open();
        createAccount();
        createSpaceActions.createSpace();
    });

    it(`\nGo to create a segment page --> verify create segment button and hover over + link\n`, () => {
        clickOnAudienceLink();
        expect(verifyAllSegmentsPage()).to.equal(true);
    });

    it('Go to segment detail page using create segment button', () => {
        clickCreateSegmentButton();
        expect(verifySegmentDetailpage()).to.equal(true);
    });

    it('Verify untitled segment is created', () => {
        expect(verifyUntitledSegment("0")).to.equal(true);
    });

    it('Verify untitled segment on all segments page', () => {
        clickOnAudienceLink();
        expect(verifyUntitledSegment("0")).to.equal(true);
    });

    it('Create named segment using hover over + link', () => {
        title = lib.randomString.generate(5);
        tagline = lib.randomString.generate(9);
        clickCreateSegmentLink();
        inputSegmentDetails(title, tagline);
        expect(verifyTagAndTitleOnCard(title, tagline, "0")).to.equal(true);
    });

    it('Select colour from swatch --> Colour appears on segment card', () => {
        selectColour();
        expect(verifySegmentCardColour("0")).to.equal(true);
    });

    it('Verify segment title, tag and color on all segments page', () => {
        clickOnAudienceLink();
        expect(verifyTagAndTitleOnCard(title, tagline, "1")).to.equal(true);
        expect(verifySegmentCardColour("1")).to.equal(true);
    });
});
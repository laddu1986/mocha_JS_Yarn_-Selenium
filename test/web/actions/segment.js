import * as lib from '../../common';
import NavBar from 'web/page_objects/navBar';
import SegmentPage from 'web/page_objects/segmentPage'
var colorIndex, selectedColourValue;

export function clickOnAudienceLink() {
    NavBar.audienceLink.click();
}

export function clickCreateSegmentButton() {
    SegmentPage.createSegmentButton.click();
}

export function clickCreateSegmentLink() {
    SegmentPage.createSegmentLink.click();
}

export function inputSegmentDetails(name, tagline) {
    SegmentPage.titleField.setValue(name);
    SegmentPage.taglineField.setValue(tagline);
}

export function selectColour() {   // randomly selects the segment colour swatch everytime
    colorIndex = lib.randomString.generate({
        length: 1,
        charset: '01234567'
    });
    SegmentPage.colourSwatch.value[colorIndex].click();
    selectedColourValue = SegmentPage.colourSwatch.value[colorIndex].getAttribute("style");
}

export function verifySegmentDetailpage() {
    return SegmentPage.titleField.isVisible();
}

export function verifyAllSegmentsPage() {
    return SegmentPage.createSegmentButton.isVisible();
}

export function verifySegmentCardColour(count) {
    SegmentPage.segmentCards.waitForVisible();
    if (SegmentPage.segmentCards.value[count].getAttribute("style") == selectedColourValue) {
        return true;
    }
}

export function verifyTagAndTitleOnCard(name, tagline, count) {
    if (SegmentPage.segmentCardTitle.value[count].getText() === name && SegmentPage.segmentCardTagline.value[count].getText() === tagline) {
        return true;
    }
}

export function verifyUntitledSegment(count) {
    return (SegmentPage.segmentCardTitle.value[count].getText() == 'Untitled segment')
}

export function createSegment(name, tagline) {
    clickOnAudienceLink();
    clickCreateSegmentButton();
    inputSegmentDetails(name, tagline);
    clickOnAudienceLink();
}
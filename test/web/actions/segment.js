import * as lib from '../../common';
import NavBar from 'web/page_objects/navBar';
import Common from 'web/page_objects/common';
import SegmentPage from 'web/page_objects/segmentPage';
import * as Constants from 'data/constants.json';
var colorIndex, selectedColourValue, actualValue;;
import { confirmDelete, cancelDelete } from 'web/actions/common'


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

export function verifySegment(type, value) {
    if (type === Constants.SegmentAttributes.Title) {
        actualValue = SegmentPage.segmentCardTitle.getText();
    } else {
        actualValue = SegmentPage.segmentCardTagline.getText();
    }
    return (actualValue == value)
}

export function createSegment(name, tagline) {
    clickOnAudienceLink();
    clickCreateSegmentButton();
    inputSegmentDetails(name, tagline);
    clickOnAudienceLink();
}

export function goToSegmentDetailPage() {
    SegmentPage.segmentCards.value[0].click();
}

export function updateSegment(type, value) {
    if (type === Constants.SegmentAttributes.Title) {
        SegmentPage.titleField.setValue(value);
    } else {
        SegmentPage.taglineField.setValue(value);
    }
}

export function deleteSegment(flag) {
    if (flag == false) {
        Common.submitButton.click();
        cancelDelete()
    } else {
        Common.submitButton.click();
        confirmDelete()
    }
}
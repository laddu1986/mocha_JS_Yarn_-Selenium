import * as lib from '../../common';
import Common from 'web/page_objects/common';
import SegmentPage from 'web/page_objects/segmentPage';
import * as Constants from 'data/constants.json';
var colorIndex, selectedColourValue, actualValue;
import { confirmDelete, cancelDelete, typeDeleteToConfirm } from 'web/actions/common'

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
    clickCreateSegmentButton();
    inputSegmentDetails(name, tagline);
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

export function deleteSegment() {
    clickDeleteSegButton()
    typeDeleteToConfirm()
    confirmDelete()
}

export function clickDeleteSegButton() {
    Common.submitButton.click();
}

export function cancelDeleteSegment() {
    return cancelDelete(Common.submitButton)
}

var SegmentRulesFilters = [Constants.SegmentRulesFilters.Properties.ActiveDays, Constants.SegmentRulesFilters.Properties.AvgSessions, Constants.SegmentRulesFilters.Properties.AvgSessionTime, Constants.SegmentRulesFilters.Properties.LastSeen, Constants.SegmentRulesFilters.Properties.Created, Constants.SegmentRulesFilters.Properties.Known, Constants.SegmentRulesFilters.Properties.FirstSeen, Constants.SegmentRulesFilters.Properties.Joined];

export function verifyFilterOptions(type) {
    if (type == Constants.SegmentFilterTypes.AudienceType)
        return (SegmentPage.audienceTypeMenuItems.value[0].getText() == Constants.SegmentRulesFilters.AudienceType.User && SegmentPage.audienceTypeMenuItems.value[1].getText() == Constants.SegmentRulesFilters.AudienceType.Visitor);
    if (type == Constants.SegmentFilterTypes.LogicalType)
        return (SegmentPage.logicalTypeMenuItems.value[0].getText() == Constants.SegmentRulesFilters.LogicalType.Any && SegmentPage.logicalTypeMenuItems.value[1].getText() == Constants.SegmentRulesFilters.LogicalType.All);
    if (type == Constants.SegmentFilterTypes.Property) {
        for (var i = 0; i < SegmentPage.properties.length; i++) {
            if (SegmentPage.properties.value[i].getText() != SegmentRulesFilters[i]) {
                return false;
            }
        }
        return true;
    }
}
var Active_Average_Operators = [Constants.SegmentRulesFilters.Operators.IsUnknown, Constants.SegmentRulesFilters.Operators.Is, Constants.SegmentRulesFilters.Operators.IsNot, Constants.SegmentRulesFilters.Operators.GreaterThan, Constants.SegmentRulesFilters.Operators.LessThan, Constants.SegmentRulesFilters.Operators.HasAnyValue];
var Other_Operators = [Constants.SegmentRulesFilters.Operators.On, Constants.SegmentRulesFilters.Operators.HasAnyValue, Constants.SegmentRulesFilters.Operators.LessThan, Constants.SegmentRulesFilters.Operators.Exactly, Constants.SegmentRulesFilters.Operators.Before, Constants.SegmentRulesFilters.Operators.MoreThan, Constants.SegmentRulesFilters.Operators.IsUnknown, Constants.SegmentRulesFilters.Operators.After];

export function verifyOperators(type) {
    if (type == "Avg") {
        for (var i = 0; i < Active_Average_Operators.length; i++) {
            if (SegmentPage.operators.value[i].getText() != Active_Average_Operators[i]) {
                return false;
            }
        }
        return true;
    } else {
        for (var i = 0; i < Other_Operators.length; i++) {
            if (SegmentPage.operators.value[i].getText() != Other_Operators[i]) {
                return false;
            }
        }
        return true;
    }
}

export function clickFilter(type) {
    if (type == Constants.SegmentFilterTypes.AudienceType)
        SegmentPage.audienceType.click();
    if (type == Constants.SegmentFilterTypes.LogicalType)
        SegmentPage.logicalType.click();
    if (type == Constants.SegmentFilterTypes.Property)
        SegmentPage.addFilter.click();
}

export function selectAudienceType(count) {
    SegmentPage.audienceTypeMenuItems.value[count].click();
}

export function selectLogicalType(count) {
    SegmentPage.logicalTypeMenuItems.value[count].click();
}

export function selectProperty(count) {
    SegmentPage.properties.value[count].click();
}

export function selectOperator(count) {
    SegmentPage.operators.value[count].click();
}

export function input(data) {
    SegmentPage.textField.setValue(data);
    browser.keys("Escape");
}

export function verifyFilterValue(count) {
    return SegmentPage.filters.value[count].getText();
}

export function verifyFilterExists() {
    if (SegmentPage.filters.value.length > 0)
        return true;
    else
        return false;
}

export function removeRuleFilter() {
    SegmentPage.deleteFilter.click();
}

export function selectDate() {
    SegmentPage.todayDate.click();
    browser.keys("Escape");
}

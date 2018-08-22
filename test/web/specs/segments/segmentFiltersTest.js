import * as lib from '../../../common';
import * as Constants from 'data/constants.json';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { selectDate, verifyFilterValue, selectLogicalType, selectAudienceType, input, verifyFilterExists, verifyFilterOptions, verifyOperators, selectOperator, createSegment, removeRuleFilter, clickFilter, selectProperty } from 'web/actions/segment';

var name = lib.randomString.generate(5), tagline = lib.randomString.generate(9);

describe('Segment Detail Tests', () => {
    before(() => {
        accountPage.open();
        createAccount();
        createSpace();
        clickOnAudienceLink();
        createSegment(name, tagline);
    });

    it('Verify the Audience Type filter', () => {
        clickFilter(Constants.SegmentFilterTypes.AudienceType);
        expect(verifyFilterOptions(Constants.SegmentFilterTypes.AudienceType)).to.equal(true, "The audience type filter does not show all options");
    });

    it('Verify the Logical Type filter', () => {
        clickFilter(Constants.SegmentFilterTypes.LogicalType);
        expect(verifyFilterOptions(Constants.SegmentFilterTypes.LogicalType)).to.equal(true, "The logical type filter does not show all options");
    });

    it('Verify the Property filter', () => {
        clickFilter(Constants.SegmentFilterTypes.Property);
        expect(verifyFilterOptions(Constants.SegmentFilterTypes.Property)).to.equal(true, "The Operations filter does not show all options");
    });

    it('Verify the Operator filter', () => {
        var type = "Avg";
        for (var i = 0; i < 8; i++) {
            if (i == 3) { type = "NotAvg" }
            selectProperty(i);
            expect(verifyOperators(type)).to.equal(true, "All operators for property " + i + " are not shown");
            removeRuleFilter();
            clickFilter(Constants.SegmentFilterTypes.Property);
        }
    });

    it('Verify filter can be added', () => {
        selectProperty("0");
        selectOperator("0");
        browser.keys("Escape");
        expect(verifyFilterExists()).to.equal(true, "The filter does not exist");
    });

    it('Verify filter can be deleted', () => {
        removeRuleFilter();
        expect(verifyFilterExists()).to.equal(false, "The filter is not deleted");
    });

    it('Adding filter with number property for Visitor', () => {
        clickFilter(Constants.SegmentFilterTypes.AudienceType);
        selectAudienceType("1");
        clickFilter(Constants.SegmentFilterTypes.LogicalType);
        selectLogicalType("0");
        clickFilter(Constants.SegmentFilterTypes.Property);
        selectProperty(0);
        selectOperator(1);
        input("5");
        expect(verifyFilterValue("0")).to.include("5", "The filter does not have a number");
    });

    it('Adding filter with date property for User', () => {
        removeRuleFilter();
        var today = new Date();
        clickFilter(Constants.SegmentFilterTypes.Property);
        selectProperty(3);
        selectOperator(0);
        selectDate();
        expect(verifyFilterValue("0")).to.include(lib.dateFormat(today, "mmm dd yyyy"));
    });
});
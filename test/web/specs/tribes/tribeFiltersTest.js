import * as lib from '../../../common';
import * as Constants from 'data/constants.json';
import accountPage from 'web/page_objects/accountPage';
import { createAccount } from 'web/actions/account';
import { createSpace } from 'web/actions/space';
import { clickOnAudienceLink } from 'web/actions/navBar';
import { selectDate, verifyFilterValue, selectLogicalType, selectAudienceType, input, verifyFilterExists, verifyFilterOptions, verifyOperators, selectOperator, clickCreateTribeButton, removeRuleFilter, clickFilter, selectProperty } from 'web/actions/tribe';

describe('Tribe Rule Filter Tests', () => {
    before(() => {
        accountPage.open();
        createAccount();
        createSpace();
        clickOnAudienceLink();
        clickCreateTribeButton();
    });

    it('Verify the Audience Type filter', () => {
        clickFilter(Constants.TribeFilterTypes.AudienceType);
        expect(verifyFilterOptions(Constants.TribeFilterTypes.AudienceType)).to.equal(true, "The audience type filter does not show all options");
    });

    it('Verify the Logical Type filter', () => {
        clickFilter(Constants.TribeFilterTypes.LogicalType);
        expect(verifyFilterOptions(Constants.TribeFilterTypes.LogicalType)).to.equal(true, "The logical type filter does not show all options");
    });

    it('Verify the Property filter', () => {
        clickFilter(Constants.TribeFilterTypes.Property);
        expect(verifyFilterOptions(Constants.TribeFilterTypes.Property)).to.equal(true, "The Operations filter does not show all options");
    });

    it('Verify the Operator filter', () => {
        var type, name;
        for (var i = 0; i < 8; i++) {
            name = selectProperty(i);
            if (name == Constants.TribeRulesFilters.Properties.AvgSessionTime || name == Constants.TribeRulesFilters.Properties.AvgSessions || name == Constants.TribeRulesFilters.Properties.ActiveDays)
                type = "Avg"
            else
                type = "NotAvg"
            expect(verifyOperators(type)).to.equal(true, "All operators for property " + i + " are not shown");
            removeRuleFilter();
            clickFilter(Constants.TribeFilterTypes.Property);
        }
    });

    it('Verify date filter can be added', () => {
        var today = new Date();
        selectProperty("0");
        selectOperator("3");
        selectDate();
        browser.keys("Escape");
        expect(verifyFilterExists()).to.equal(true, "The filter does not exist");
        expect(verifyFilterValue("0")).to.include(lib.dateFormat(today, "mmm dd yyyy"));
    });

    it('Verify filter can be deleted', () => {
        removeRuleFilter();
        expect(verifyFilterExists()).to.equal(false, "The filter is not deleted");
    });

    it('Adding filter with number property for Visitor', () => {
        clickFilter(Constants.TribeFilterTypes.AudienceType);
        selectAudienceType("1");
        clickFilter(Constants.TribeFilterTypes.LogicalType);
        selectLogicalType("0");
        clickFilter(Constants.TribeFilterTypes.Property);
        selectProperty(0);
        selectOperator(1);
        input("5");
        expect(verifyFilterValue("0")).to.include("5", "The filter does not have a number");
    });
});
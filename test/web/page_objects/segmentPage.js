import Page from './page';

class SegmentPage extends Page {
    get audienceLink() { return browser.element("//*[@data-qa='nav:audience']"); }
    get createSegmentButton() { return browser.element("//button[@data-qa='btn:create-segment']"); }
    get createSegmentLink() { return browser.element("//button[@data-qa='btn:card:create-segment']"); }
    get titleField() { return browser.element("//*[@name='title']"); }
    get taglineField() { return browser.element("//*[@name='tagline']"); }
    get segmentCards() { return browser.elements("//*[@data-qa='segment:card']"); }
    get segmentCardTitle() { return browser.elements("//h1[@data-qa='segment:title']"); }
    get segmentCardTagline() { return browser.elements("//p[@data-qa='segment:tagline']"); }
    get colourSwatch() { return browser.elements("//button[@data-qa='btn:color']//div[@data-qa='color:display']"); }

    get audienceType() { return browser.element("//button[@data-qa='segment:rule:audienceType']"); }
    get logicalType() { return browser.element("//button[@data-qa='segment:rule:logicalType']"); }
    get addFilter() { return browser.element("//button[@data-qa='segment:rule:addFilter']"); }
    get audienceTypeMenuItems() { return browser.elements("//div[@data-qa='segment:rule:audienceType:menu-item']"); }
    get logicalTypeMenuItems() { return browser.elements("//div[@data-qa='segment:rule:logicalType:menu-item']"); }
    get properties() { return browser.elements("//div[@data-qa='segment:rule:addFilter:menu-item']"); }
    get operators() { return browser.elements("//div[@data-qa='segment:rule:menu-item']"); }
    get segmentActionsMenu() { return browser.element("//button[@data-qa='segment:actions']"); }
    get deleteFilter() { return browser.element("//span[@data-qa='segment:rule:delete']"); }
    get delete() { return browser.element("//div[@data-qa='segment:actions:menu-item:delete']"); }
    get filters() { return browser.elements("//button[@data-qa='segment:rule:filter']"); }
    get textField() { return browser.element("//input[@data-qa='segment:rule:input']"); }
    get todayDate() { return browser.element("//div[contains(@class,'today')]"); }

    open(e) {
        super.open(e);
    }
}

export default new SegmentPage();

import Page from './page';

class TribePage extends Page {
    get audienceLink() { return browser.element("//*[@data-qa='nav:audience']"); }
    get createTribeButton() { return browser.element("//button[@data-qa='btn:create-segment']"); }
    get createTribeLink() { return browser.element("//button[@data-qa='btn:card:create-segment']"); }
    get titleField() { return browser.element("//input[@data-qa='input:segment-title']"); }
    get taglineField() { return browser.element("//input[@data-qa='input:segment-tagline']"); }
    get tribeCards() { return browser.elements("//*[@data-qa='segment:card']"); }
    get tribeCardTitle() { return browser.elements("//h1[@data-qa='segment:title']"); }
    get tribeCardTagline() { return browser.elements("//p[@data-qa='segment:tagline']"); }
    get colourSwatch() { return browser.elements("//button[@data-qa='btn:color']//div[@data-qa='color:display']"); }

    get audienceType() { return browser.element("//button[@data-qa='segment:rule:audienceType']"); }
    get logicalType() { return browser.element("//button[@data-qa='segment:rule:logicalType']"); }
    get addFilter() { return browser.element("//button[@data-qa='segment:rule:addFilter']"); }
    get audienceTypeMenuItems() { return browser.elements("//div[@data-qa='segment:rule:audienceType:menu-item']"); }
    get logicalTypeMenuItems() { return browser.elements("//div[@data-qa='segment:rule:logicalType:menu-item']"); }
    get properties() { return browser.elements("//div[@data-qa='segment:rule:addFilter:menu-item']"); }
    get operators() { return browser.elements("//div[@data-qa='segment:rule:menu-item']//label"); }
    get tribeActionsMenu() { return browser.element("//button[@data-qa='segment:actions']"); }
    get deleteFilter() { return browser.element("//span[@data-qa='segment:rule:delete']"); }
    get delete() { return browser.element("//button[@data-qa='menu-item:delete']"); }
    get filters() { return browser.elements("//button[@data-qa='segment:rule:filter']"); }
    get textField() { return browser.element("//input[@data-qa='segment:rule:input']"); }
    get todayDate() { return browser.element("//div[contains(@class,'today')]"); }

    open(e) {
        super.open(e);
    }
}

export default new TribePage();

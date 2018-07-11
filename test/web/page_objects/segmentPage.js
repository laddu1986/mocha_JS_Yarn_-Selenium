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

    open(e) {
        super.open(e);
    }
}

export default new SegmentPage();

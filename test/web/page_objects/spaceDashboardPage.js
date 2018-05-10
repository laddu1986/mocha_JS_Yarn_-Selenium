import Page from './page';

class SpaceDashboardPage extends Page {
  get currentSpaceName() { return browser.element("//section[@data-qa='notifications:passive']") }
  get devApiGuideButton() { return browser.element("//div[contains(text(),'Developer API Guide')]") }
  get APIKey() { return browser.element("//p[@data-qa='api-key-value']") }
  get copyToClipboard() { return browser.element("//button[@title='Copy']") }
  get successMsg() { return browser.element("//div[@data-qa='notification:success']") }

  open(e) {
    super.open(e);
  }
}

export default new SpaceDashboardPage();

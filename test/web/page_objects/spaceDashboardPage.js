import Page from './page';

class SpaceDashboardPage extends Page {
  get currentSpaceName() { return browser.element("//section[@data-qa='notifications:passive']") }
  get devApiGuideButton() { return browser.element("//div[contains(text(),'Developer API Guide')]") }
  get APIKey() { return browser.element("//p[@data-qa='api-key-value']") }
  get copyToClipboard() { return browser.element("//button[@title='Copy']") }
  get deleteButton() { return browser.element("//button[@title='Delete']") }
  get revokeButton() { return browser.element("//button[@title='Revoke']") }
  get undoButton() { return browser.element("//button[@title='Undo']") }
  get APIKeyStatus() { return browser.element("//p[@data-qa='api-key-status']") }

  open(e) {
    super.open(e);
  }
}

export default new SpaceDashboardPage();

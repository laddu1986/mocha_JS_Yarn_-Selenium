import Page from './page';

class SpaceAPIKeyPage extends Page {
  get currentSpaceName() {
    return browser.element("//section[@data-qa='notifications:passive']");
  }
  get devApiGuideButton() {
    return browser.element("//div[contains(text(),'Developer API Guide')]");
  }
  get deleteButton() {
    return browser.element("//button[@title='Delete']");
  }
  get revokeButton() {
    return browser.element("//button[@title='Revoke']");
  }
  get undoButton() {
    return browser.element("//button[@title='Undo']");
  }
  get APIKeyStatus() {
    return browser.element("//p[@data-qa='api-key-status']");
  }
  get APIKeyData() {
    return browser.element("//section[@data-qa='page:space-developers']//section[2]//div[2]//samp");
  }

  open(e) {
    super.open(e);
  }
}

export default new SpaceAPIKeyPage();

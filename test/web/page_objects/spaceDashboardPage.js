import Page from './page';

class SpaceDashboardPage extends Page {
  get currentSpaceName() { return browser.element("//section[@data-qa='notifications:passive']"); }
  get devApiGuideButton() { return browser.element("//div[contains(text(),'Developer API Guide')]"); }

  open(e) {
    super.open(e);
  }
}

export default new SpaceDashboardPage();

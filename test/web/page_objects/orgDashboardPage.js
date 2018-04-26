import Page from './page';


class OrgDashboardPage extends Page {
  get currentOrgName() { return browser.element("//*[@data-qa='page:org-dashboard']//header//p") }
  get welcomeMsg() { return browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Welcome')]") }
  get orgSettingsNavMenu() { return browser.element("//div[@data-qa='menu:profile']//a[@data-qa='nav:org-settings']") }

  get orgNameH2() { return browser.element("//*[@data-qa='page:org-dashboard']//h2"); }
  get changeOrgAnchor() { return browser.element("//div[@data-qa='page:org-dashboard']//a[@href]"); }
  get orgCardAnchor() { return browser.element("//a[@data-qa='org:card'][1]"); }
  get orgCardCountAnchor() { return browser.elements("//a[@data-qa='org:card']"); }

  get createNewSpaceInput() { return browser.element("//input[@data-qa='input:space-name']") }
  get createNewSpaceButton() { return browser.element("//button[@data-qa='button:create-space']") }

  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();

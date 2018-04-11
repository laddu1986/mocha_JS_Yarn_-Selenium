import Page from './page';


class OrgDashboardPage extends Page {
  get currentOrgName() { return browser.element("//*[@data-qa='page:org-dashboard']//p") }
  get welcomeMsg() { return browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Welcome')]") }
  get orgSettingsNavMenu() { return browser.element("//*[@data-qa='nav:org-settings']") }
  

  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();

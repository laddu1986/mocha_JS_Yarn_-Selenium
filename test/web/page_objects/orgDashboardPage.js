import Page from './page';


class OrgDashboardPage extends Page {
  get currentOrgName() { return browser.element("//*[@data-qa='page:org-dashboard']//h2") }
  get welcomeMsg() { return browser.element("//*[@data-qa='page:org-dashboard']//*[contains(text(),'Welcome')]") }

  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();

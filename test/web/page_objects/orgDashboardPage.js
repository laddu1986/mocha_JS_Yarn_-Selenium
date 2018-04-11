import Page from './page';

class OrgDashboardPage extends Page {
  get orgNameH2() { return browser.element("//*[@data-qa='page:org-dashboard']//h2"); }
  get welcomeMsg() { return browser.element("//div[@data-qa='page:org-dashboard']//h3[1]") ;}


  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();

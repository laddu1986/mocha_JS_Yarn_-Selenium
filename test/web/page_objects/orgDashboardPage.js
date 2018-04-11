import Page from './page';

class OrgDashboardPage extends Page {
  get orgNameH2() { return browser.element("//*[@data-qa='page:org-dashboard']//h2"); }
  get welcomeMsg() { return browser.element("//div[@data-qa='page:org-dashboard']//h3[1]"); }
  get changeOrgAnchor() { return browser.element("//div[@data-qa='page:org-dashboard']//a[@href]"); }
  get orgCardAnchor() { return browser.element("//a[@data-qa='org:card'][1]"); }
  get orgCardCountAnchor() { return browser.elements("//a[@data-qa='org:card']"); }

  open(e) {
    super.open(e);
  }
}

export default new OrgDashboardPage();

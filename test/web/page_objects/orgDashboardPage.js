import Page from './page';
const config = require('config-yml');
class OrgDashboardPage extends Page {


  get welcomeMsg() { return browser.element("//*[@data-qa='page:org-dashboard']//h2") }
  get currentOrgName() { return browser.element("//div[@data-qa='page:org-dashboard']/div[2]/p")}


  open(e) {
    super.open(e);
  }


}

export default new OrgDashboardPage();

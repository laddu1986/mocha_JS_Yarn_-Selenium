import Page from './page';
const config = require('config-yml');
class orgDashboardPage extends Page {


  get welcomeMsg() { return browser.element("//h1") }


  open() {
    super.open();
  }


}

export default new orgDashboardPage();

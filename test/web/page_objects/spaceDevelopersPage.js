import Page from './page';

class SpaceDevelopersPage extends Page {
  get APIKeyData() {
    return browser.element("//section[@data-qa='page:space-developers']//section[2]//div[2]//samp");
  }

  open(e) {
    super.open(e);
  }
}

export default new SpaceDevelopersPage();

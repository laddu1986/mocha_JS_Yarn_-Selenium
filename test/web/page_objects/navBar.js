import Page from './page';

class NavBar extends Page {

// settings
  get settingsAnchor() { return browser.element("//*[@data-qa='nav:org-settings']"); }
  get backToOrgDashboardLink() { return browser.element("//a[@data-qa='link:dashboard']"); }
  // Help
  get helpMenuNav() { return browser.element("//*[@data-qa='menu:help']"); }
  get teamNavLink() { return browser.element("//*[@data-qa='link:team']"); }
  get helpCenterAnchor() { return browser.element("//*[contains(text(),'Help Center')]"); }
  get devPortalAnchor() { return browser.element("//*[contains(text(),'Developer Portal')]"); }
  get apiPortalAnchor() { return browser.element("//*[contains(text(),'API Portal')]"); }
  get sysStatusAnchor() { return browser.element("//*[contains(text(),'System Status')]"); }

  get signOut() { return browser.element("//*[@data-qa='nav:sign-out']"); }

  open(e) {
    super.open(e);
  }
}
export default new NavBar();

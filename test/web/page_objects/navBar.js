import Page from './page';

class NavBar extends Page {

  // settings
  get settingsAnchor() { return browser.element("//*[@data-qa='nav:org-settings']"); }
  get backToOrgDashboardLink() { return browser.element("//a[@data-qa='link:org-ctx']"); }

  get profileMenu() { return browser.element("//div[@data-qa='md-profile']//div[@data-qa='btn:menu']"); }
  get audienceLink() { return browser.element("//a[@data-qa='nav:audience']"); }
  // Help
  get helpMenuNav() { return browser.element("//*[@data-qa='md:help']"); }
  get teamNavLink() { return browser.element("//*[@data-qa='nav:team']"); }
  get helpCenterAnchor() { return browser.element("//*[contains(text(),'Help Center')]"); }
  get devPortalAnchor() { return browser.element("//*[contains(text(),'Developer Portal')]"); }
  get apiPortalAnchor() { return browser.element("//*[contains(text(),'API Portal')]"); }
  get sysStatusAnchor() { return browser.element("//*[contains(text(),'System Status')]"); }
  get navOrgs() { return browser.elements("//*[@data-qa='nav:org']"); }

  get signOut() { return browser.element("//*[@data-qa='nav:sign-out']"); }

  open(e) {
    super.open(e);
  }
}
export default new NavBar();

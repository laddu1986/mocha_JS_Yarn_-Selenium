import Page from './page';

class NavBar extends Page {

  //common
  get profileMenu() { return browser.element("//div[@data-qa='md-profile']//div[@data-qa='btn:menu']"); }

  //org
  get orgSettingsAnchor() { return browser.element("//div[@data-qa='md-profile']//*[contains(text(),'Settings')]"); }
  get backToOrgDashboardLink() { return browser.element("//a[@data-qa='link:org-ctx']"); }

  //space
  get spaceDashboard() { return browser.element("//a[@data-qa='nav:dashboard']"); }
  get audienceLink() { return browser.element("//a[@data-qa='nav:audience']"); }
  get spaceSettings() { return browser.element("//a[@data-qa='nav:settings']"); }
  get backToSpaceDashboardLink() { return browser.element("//a[@data-qa='link:space-ctx']"); }
  get developerLink() { return browser.element("//a[@data-qa='nav:developer']"); }

  // Help
  get helpMenuNav() { return browser.element("//*[@data-qa='md:help']"); }
  get teamNavLink() { return browser.element("//*[@data-qa='nav:team']"); }
  get helpCenterAnchor() { return browser.element("//*[contains(text(),'Help Center')]"); }
  get devPortalAnchor() { return browser.element("//*[contains(text(),'Developer Portal')]"); }
  get apiPortalAnchor() { return browser.element("//*[contains(text(),'API Portal')]"); }
  get sysStatusAnchor() { return browser.element("//*[contains(text(),'System Status')]"); }
  get navOrgs() { return browser.elements("//*[@data-qa='ul-org-list']//li"); }

  get signOut() { return browser.element("//li[@data-qa='sign-out']"); }
  open(e) {
    super.open(e);
  }
}
export default new NavBar();

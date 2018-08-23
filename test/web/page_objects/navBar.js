import Page from './page';

class NavBar extends Page {

  //common
  get profileMenu() { return browser.element("//div[@data-qa='menu:profile']//div[@data-qa='btn:menu']"); }

  //org
  get orgSettingsAnchor() { return browser.element("//ul[@data-qa='submenu:profile']//a[@data-qa='mi:org-settings']"); }
  get backToOrgDashboardLink() { return browser.element("//a[@data-qa='link:org-ctx']"); }

  //space
  get spaceDashboard() { return browser.element("//a[@data-qa='nav:dashboard']"); }
  get audienceLink() { return browser.element("//a[@data-qa='nav:audience']"); }
  get spaceSettings() { return browser.element("//a[@data-qa='nav:settings']"); }
  get backToSpaceDashboardLink() { return browser.element("//a[@data-qa='link:space-ctx']"); }
  get developerLink() { return browser.element("//a[@data-qa='nav:developer']"); }

  // Help
  get helpMenuNav() { return browser.element("//div[@data-qa='menu:help']//div[@data-qa='btn:menu']"); }
  get teamNavLink() { return browser.element("//*[@data-qa='nav:team']"); }
  get helpCenterAnchor() { return browser.element("//ul[@data-qa='submenu:help']//a[@data-qa='mi:help-centre']"); }
  get apiPortalAnchor() { return browser.element("//ul[@data-qa='submenu:help']//a[@data-qa='mi:api-portal']"); }
  get sysStatusAnchor() { return browser.element("//ul[@data-qa='submenu:help']//a[@data-qa='mi:system-uptime']"); }
  get navOrgs() { return browser.elements("//ul[@data-qa='submenu:org-list']//li"); }

  get signOut() { return browser.element("//li[@data-qa='mi:sign-out']"); }
  open(e) {
    super.open(e);
  }
}
export default new NavBar();

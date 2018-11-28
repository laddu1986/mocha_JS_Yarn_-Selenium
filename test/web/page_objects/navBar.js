import Page from './page';

class NavBar extends Page {
  //common
  get profileMenu() {
    return browser.element("//div[@data-qa='menu:profile']//div[@data-qa='btn:menu']");
  }
  //selected org
  get selectedOrg() {
    return browser.element("//li[@data-qa='nav:menu']");
  }
  get firstOrg() {
    return browser.element("//a[@data-qa='mi:org']");
  }
  //org
  get orgSettingsAnchor() {
    return browser.element("//ul[@data-qa='submenu:profile']//div[contains(text(),'Org Settings')]");
  }
  get general() {
    return browser.element("//ul[@data-qa='submenu:org-settings']//div[contains(text(),'General')]");
  }
  get backToOrgDashboardLink() {
    return browser.element("//a[@data-qa='nav:logo']");
  }

  //space
  get spaceDashboard() {
    return browser.element("//a[@data-qa='nav:dashboard']");
  }
  get audienceLink() {
    return browser.element("//a[@data-qa='nav:audience']");
  }
  get spaceSettings() {
    return browser.element("//div[@data-qa='menu:settings']");
  }
  get generalSpaceSettings(){
     return browser.element("//ul[@data-qa='submenu:settings']//div[contains(text(),'General')]");
  }
  get backToSpaceDashboardLink() {
    return browser.element("//a[@data-qa='link:space-ctx']");
  }
  get developerLink() {
    return browser.element("//a[@data-qa='nav:developer']");
  }

  // Help
  get helpMenuNav() {
    return browser.element("//div[@data-qa='menu:help']//div[@data-qa='btn:menu']");
  }
  get teamNavLink() {
    return browser.element("//*[@data-qa='mi:team']");
  }
  get helpCenterAnchor() {
    return browser.element("//ul[@data-qa='submenu:help']//a[@data-qa='mi:help-centre']");
  }
  get apiPortalAnchor() {
    return browser.element("//ul[@data-qa='submenu:help']//a[@data-qa='mi:api-portal']");
  }
  get sysStatusAnchor() {
    return browser.element("//ul[@data-qa='submenu:help']//a[@data-qa='mi:system-uptime']");
  }
  get navOrgs() {
    return browser.elements("//ul[@data-qa='submenu:org-list']//li");
  }

  get signOut() {
    return browser.element("//li[@data-qa='mi:sign-out']");
  }
  open(e) {
    super.open(e);
  }
}
export default new NavBar();

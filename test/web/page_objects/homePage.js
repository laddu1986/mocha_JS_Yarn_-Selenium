// import Page from './page';
// import Actions from '../actions/actions';

class HomePage {
  get navbar() { return browser.element('#navbar'); }
  get profileMenu() { return browser.element("//nav[@data-qa='menu:profile']//div[@data-qa='btn:menu']"); }
  get switchOrCreateOrganizations() { return browser.element("//*[@data-qa='nav:menu']"); }
  get createOrg() { return browser.element("//*[@data-qa='nav:create-org']"); }
  get createOrgInput() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:text']"); }
  get createOrgErr() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']"); }
  get submit() { return browser.element("//*[@data-qa='btn:submit']"); }
  get logo() { return browser.element("//*[@data-qa='nav:logo']"); }
  get orgListFromNavMenu() { return browser.elements("//*[@data-qa='nav:menu']//li"); }
  get chooseOrg() { return browser.element("//*[@data-qa='page:choose-org']"); }
  get individualOrgCard() { return browser.elements("//*[@data-qa='org:card']"); }
  get noOrgs() { return browser.element("//*[@data-qa='page:no-orgs']"); }
  get createOrgButton() { return browser.element("//*[@data-qa='link:create-org']") }
  get removeAccountButton() { return browser.element("//button[@data-qa='btn:delete-acc']") }

  get helpMenuNav() { return browser.element("//*[@data-qa='menu:help']"); }
  get helpCenterAnchor() { return browser.element("//*[contains(text(),'Help Center')]"); }
  get devPortalAnchor() { return browser.element("//*[contains(text(),'Developer Portal')]"); }
  get apiPortalAnchor() { return browser.element("//*[contains(text(),'API Portal')]"); }
  get sysStatusAnchor() { return browser.element("//*[contains(text(),'System Status')]"); }

  get settingsAnchor() { return browser.element("//*[@data-qa='nav:org-settings']"); }
  get profileDetailsAnchor() { return browser.element("//*[@data-qa='nav:profile']"); }
  get orgSettingsAnchor() { return browser.element("//*[@data-qa='link:settings']"); }
  get teamAnchor() { return browser.element("//*[@data-qa='link:team']"); }
  get orgNameAnchor() { return browser.element("//*[@data-qa='link:dashboard']"); }

  get signOut() { return browser.element("//*[@data-qa='nav:sign-out']"); }

  // open() {
  //   super.open();
  // }
}

export default new HomePage();

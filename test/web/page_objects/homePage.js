class HomePage {
  get navbar() { return browser.element('#navbar'); }
  get switchOrCreateOrganizations() { return browser.element("//*[@data-qa='nav:menu']"); }
  get createOrg() { return browser.element("//*[@data-qa='nav:create-org']"); }
  get createOrgInput() { return browser.element("//input[@data-qa='input:org-name']"); }
  get createOrgErr() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']"); }

  get logo() { return browser.element("//*[@data-qa='nav:logo']"); }
  get orgListFromNavMenu() { return browser.elements("//*[@data-qa='nav:menu']//li"); }
  get orgCards() { return browser.elements("//a[@data-qa='org:card']"); }
  get createOrgButton() { return browser.element("//*[@data-qa='link:create-org']"); }
  get removeAccountButton() { return browser.element("//button[@data-qa='btn:delete-acc']"); }

  get settingsAnchor() { return browser.element("//*[@data-qa='nav:org-settings']"); }
  get profileDetailsAnchor() { return browser.element("//*[@data-qa='nav:profile']"); }
  get orgSettingsAnchor() { return browser.element("//*[@data-qa='link:settings']"); }
  get teamAnchor() { return browser.element("//*[@data-qa='link:team']"); }
  get orgNameAnchor() { return browser.element("//*[@data-qa='link:dashboard']"); }


  // Help
  get helpMenuNav() { return browser.element("//*[@data-qa='menu:help']"); }
  get helpCenterAnchor() { return browser.element("//*[contains(text(),'Help Center')]"); }
  get devPortalAnchor() { return browser.element("//*[contains(text(),'Developer Portal')]"); }
  get apiPortalAnchor() { return browser.element("//*[contains(text(),'API Portal')]"); }
  get sysStatusAnchor() { return browser.element("//*[contains(text(),'System Status')]"); }


  open(e) {
    super.open(e);
  }

}

export default new HomePage();

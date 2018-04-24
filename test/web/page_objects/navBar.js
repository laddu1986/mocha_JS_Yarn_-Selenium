import Page from './page';

class NavBar extends Page {








  //Help
  get helpMenuNav() { return browser.element("//*[@data-qa='menu:help']"); }
  get helpCenterAnchor() { return browser.element("//*[contains(text(),'Help Center')]"); }
  get devPortalAnchor() { return browser.element("//*[contains(text(),'Developer Portal')]"); }
  get apiPortalAnchor() { return browser.element("//*[contains(text(),'API Portal')]"); }
  get sysStatusAnchor() { return browser.element("//*[contains(text(),'System Status')]"); }

  get signOut() { return browser.element("//*[@data-qa='nav:sign-out']"); }

  open(e) {
    super.open(e);
  }
}
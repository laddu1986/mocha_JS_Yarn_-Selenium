import Page from './page';
const config = require('config-yml');
class HomePage extends Page {

    get navbar() { return browser.element('#navbar'); }
    get signIn() { return browser.element(config.web.signIn); }
    get submitSearch() { return browser.element('#nav-search > form > div.nav-right > div > input'); }
    get shoppingCart() { return browser.element('#nav-cart > span.nav-cart-icon.nav-sprite'); }
    get profileMenu() { return browser.element(config.web.profileMenu) }
    get switchOrCreateOrganizations() { return browser.element(config.web.navMenu) }
    get createOrg() { return browser.element(config.web.createOrg) }
    get createOrgInput() { return browser.element(config.web.createOrgName) }
    get createOrgErr() { return browser.element(config.web.createOrgErr) }
    get submit() { return browser.element(config.web.signInButton) }

    get helpMenu() { return browser.element(config.web.helpMenu) }
    get signOut() { return browser.element(config.web.signOut) }


    open() {
        super.open();
    }


}

export default new HomePage();

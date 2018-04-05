import Page from './page';
const config = require('config-yml');
class homePage extends page {

    get navbar() { return browser.element('#navbar'); }
    get submitSearch() { return browser.element('#nav-search > form > div.nav-right > div > input'); }
    get shoppingCart() { return browser.element('#nav-cart > span.nav-cart-icon.nav-sprite'); }
    get profileMenu() { return browser.element("//*[@data-qa='menu:profile']") }
    get switchOrCreateOrganizations() { return browser.element("//*[@data-qa='nav:menu']") }
    get createOrg() { return browser.element("//*[@data-qa='nav:create-org']") }
    get createOrgInput() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:text']") }
    get createOrgErr() { return browser.element("//*[@data-qa='input:org-name']//*[@data-qa='input:error']") }
    get submit() { return browser.element("//*[@data-qa='btn:submit']") }
    get welcomeMsg() { return browser.element("//h1") }
    get logo() { return browser.element("//*[@data-qa='nav:logo']"); }
    get orgList() { return browser.elements("//*[@data-qa='nav:menu']//li") }

    get helpMenu() { return browser.element("//*[@data-qa='menu:help']") }
    get signOut() { return browser.element("//*[@data-qa='menu:profile']//*[@data-qa='nav:sign-out']") }


    open() {
        super.open();
    }


}

export default new homePage();
